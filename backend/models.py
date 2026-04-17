"""SQLAlchemy ORM models for the Annapolis Vet Smart Site.

Core tables:
    users            - admin login accounts
    visitor_sessions - anonymous site visitors with accumulated intent state
    signal_events    - append-only log of every tracked interaction
    surfaces         - named dynamic sections of the site (home_hero, featured_care, etc.)
    switches         - rules attached to surfaces that swap content per intent
    lead_submissions - contact / appointment form submissions + full intent trail
"""
from __future__ import annotations

import uuid
from datetime import datetime, timezone

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


def _uuid() -> str:
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(120), default="Admin")
    role: Mapped[str] = mapped_column(String(32), default="admin")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)


class VisitorSession(Base):
    __tablename__ = "visitor_sessions"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    session_token: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)
    parent_intent: Mapped[str | None] = mapped_column(String(32), nullable=True)  # dogs|cats|critters
    sub_intent: Mapped[str | None] = mapped_column(String(64), nullable=True)
    intent_scores: Mapped[dict] = mapped_column(JSONB, default=dict)  # {dogs:3, cats:1,...}
    sub_intent_scores: Mapped[dict] = mapped_column(JSONB, default=dict)
    first_referrer: Mapped[str | None] = mapped_column(Text, nullable=True)
    user_agent: Mapped[str | None] = mapped_column(Text, nullable=True)
    page_view_count: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    last_seen_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)

    events: Mapped[list["SignalEvent"]] = relationship(
        back_populates="session", cascade="all, delete-orphan"
    )
    leads: Mapped[list["LeadSubmission"]] = relationship(back_populates="session")


class SignalEvent(Base):
    __tablename__ = "signal_events"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    session_id: Mapped[str] = mapped_column(
        UUID(as_uuid=False), ForeignKey("visitor_sessions.id", ondelete="CASCADE"), index=True
    )
    signal_type: Mapped[str] = mapped_column(String(64), nullable=False)  # page_view, cta_click, form_start, etc.
    page_path: Mapped[str | None] = mapped_column(String(512), nullable=True)
    label: Mapped[str | None] = mapped_column(String(255), nullable=True)
    intent: Mapped[str | None] = mapped_column(String(32), nullable=True)
    sub_intent: Mapped[str | None] = mapped_column(String(64), nullable=True)
    strength: Mapped[int] = mapped_column(Integer, default=1)
    meta: Mapped[dict] = mapped_column(JSONB, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow, index=True)

    session: Mapped["VisitorSession"] = relationship(back_populates="events")


class Surface(Base):
    __tablename__ = "surfaces"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    slug: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    page: Mapped[str] = mapped_column(String(64), default="home")  # home, appointment, service, etc.
    default_content: Mapped[dict] = mapped_column(JSONB, default=dict)
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, onupdate=_utcnow
    )

    switches: Mapped[list["Switch"]] = relationship(
        back_populates="surface", cascade="all, delete-orphan"
    )


class Switch(Base):
    __tablename__ = "switches"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    surface_id: Mapped[str] = mapped_column(
        UUID(as_uuid=False), ForeignKey("surfaces.id", ondelete="CASCADE"), index=True
    )
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    # Rule: {"intent":"dogs","sub_intent":"new_puppy","min_strength":0}
    rule: Mapped[dict] = mapped_column(JSONB, default=dict)
    content: Mapped[dict] = mapped_column(JSONB, default=dict)  # freeform (headline, image, cta...)
    priority: Mapped[int] = mapped_column(Integer, default=100)  # lower = higher priority
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, onupdate=_utcnow
    )

    surface: Mapped["Surface"] = relationship(back_populates="switches")


class LeadSubmission(Base):
    __tablename__ = "lead_submissions"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    session_id: Mapped[str | None] = mapped_column(
        UUID(as_uuid=False), ForeignKey("visitor_sessions.id", ondelete="SET NULL"), nullable=True
    )
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(64), nullable=True)
    pet_name: Mapped[str | None] = mapped_column(String(120), nullable=True)
    pet_type: Mapped[str | None] = mapped_column(String(64), nullable=True)
    service_interest: Mapped[str | None] = mapped_column(String(120), nullable=True)
    comment: Mapped[str | None] = mapped_column(Text, nullable=True)
    preferred_time: Mapped[str | None] = mapped_column(String(120), nullable=True)
    source_page: Mapped[str | None] = mapped_column(String(255), nullable=True)
    intent_summary: Mapped[dict] = mapped_column(JSONB, default=dict)
    signal_trail: Mapped[list] = mapped_column(JSONB, default=list)
    status: Mapped[str] = mapped_column(String(32), default="new")  # new|contacted|closed
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow, index=True)

    session: Mapped["VisitorSession | None"] = relationship(back_populates="leads")

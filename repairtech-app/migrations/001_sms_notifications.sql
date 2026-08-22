CREATE TABLE IF NOT EXISTS sms_notifications (
  id BIGSERIAL PRIMARY KEY,
  repair_id TEXT NOT NULL,
  event TEXT NOT NULL,
  phone TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_message_id TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING',
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT sms_notifications_event_check
    CHECK (event IN ('BOOKING_CREATED', 'REPAIR_READY')),

  CONSTRAINT sms_notifications_status_check
    CHECK (
      status IN (
        'PENDING',
        'SENT',
        'DELIVERED',
        'NOT_DELIVERED',
        'EXPIRED',
        'FAILED'
      )
    ),

  CONSTRAINT sms_notifications_repair_event_unique
    UNIQUE (repair_id, event)
);

CREATE INDEX IF NOT EXISTS idx_sms_notifications_repair_id
  ON sms_notifications (repair_id);

CREATE INDEX IF NOT EXISTS idx_sms_notifications_status
  ON sms_notifications (status);

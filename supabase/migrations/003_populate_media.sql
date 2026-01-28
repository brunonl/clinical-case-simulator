-- Migration: Populate missing media for all clinical cases
-- Description: Ensures all cases have at least dummy audio and images for UI testing.

UPDATE clinical_cases
SET 
  audio_url = 'https://actions.google.com/sounds/v1/alarms/heartbeat.ogg', 
  images = '["raio_x_torax.jpg", "ecg_admission.jpg", "tc_cranio.jpg"]'
WHERE audio_url IS NULL OR images::text = '[]' OR images IS NULL;

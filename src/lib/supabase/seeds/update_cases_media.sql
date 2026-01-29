-- Update script to populate media fields for clinical cases
-- This uses hardcoded example URLs for demonstration purposes

UPDATE clinical_cases
SET 
  -- Example heart/lung sounds
  audio_urls = jsonb_build_array(
    jsonb_build_object(
      'title', 'Ausculta Cardíaca',
      'url', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'description', 'Foco mitral, ritmo regular'
    ),
    jsonb_build_object(
      'title', 'Ausculta Pulmonar',
      'url', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'description', 'Murmúrios vesiculares presentes'
    )
  ),
  -- Example medical images (using placeholder services for demo)
  imaging = ARRAY[
    'https://images.unsplash.com/photo-1579165466741-7f35a4755657?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda48?auto=format&fit=crop&q=80'
  ]
WHERE id IS NOT NULL;

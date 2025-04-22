-- Create a function that will be called by the trigger
CREATE OR REPLACE FUNCTION notify_contact_message()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(
    'contact_notification', 
    json_build_object(
      'id', NEW.id,
      'name', NEW.name,
      'email', NEW.email,
      'subject', NEW.subject,
      'time', NEW.created_at
    )::text
  );
  
  -- Call the Edge Function via built-in http extension
  PERFORM
    net.http_post(
      url:='{{SUPABASE_URL}}/functions/v1/notify-contact',
      body:=json_build_object('record', row_to_json(NEW))::text,
      headers:='{
        "Content-Type": "application/json",
        "Authorization": "Bearer {{SUPABASE_SERVICE_ROLE_KEY}}"
      }'
    );
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on the contact_messages table
DROP TRIGGER IF EXISTS trigger_contact_message_notification ON contact_messages;
CREATE TRIGGER trigger_contact_message_notification
AFTER INSERT ON contact_messages
FOR EACH ROW
EXECUTE FUNCTION notify_contact_message(); 
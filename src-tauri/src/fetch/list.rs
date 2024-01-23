use utf7_imap::decode_utf7_imap;

pub fn list_box(
    reference_name: Option<String>,
    mailbox_pattern: Option<String>,
    state: &mut crate::types::ImapState,
) -> Result<Vec<String>, String> {
    match state
        .session
        .list(reference_name.as_deref(), mailbox_pattern.as_deref())
    {
        Ok(x) => {
            let mut result: Vec<String> = [].to_vec();
            for i in x.iter() {
                result.push(decode_utf7_imap(i.name().to_string()));
            }

            Ok(result)
        }
        Err(e) => Err(e.to_string()),
    }
}

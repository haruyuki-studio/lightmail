pub fn fetch_box(
    state: &mut crate::types::ImapState,
    inbox: &String,
) -> Result<Vec<String>, String> {
    match state.session.select(inbox) {
        Ok(_) => {
            // fetch message number 1 in this mailbox, along with its RFC822 field.
            // RFC 822 dictates the format of the body of e-mails
            match state.session.fetch("1,2,3,4,5", "RFC822") {
                Ok(messages) => {
                    let mut result: Vec<String> = [].to_vec();
                    for message in messages.iter() {
                        if let Some(body) = message.body() {
                            result.push(std::str::from_utf8(body).unwrap().to_string());
                        } else {
                            println!("Message didn't have a body!");
                        }
                    }
                    Ok(result)
                }
                Err(e) => Err(e.to_string()),
            }
        }
        Err(e) => Err(e.to_string()),
    }
}

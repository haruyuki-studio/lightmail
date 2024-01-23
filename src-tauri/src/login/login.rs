use std::error::Error;

use imap::{self, Connection, Session};

pub fn imap_login(server: crate::types::ServerInfo) -> Result<Option<Session<Connection>>, String> {
    match imap::ClientBuilder::new(server.server, server.port.into()).connect() {
        Ok(client) => match client.login(server.account, server.password) {
            Ok(x) => Ok(Some(x)),
            Err(e) => Err(e.0.to_string()),
        },
        Err(e) => Err(e.to_string()),
    }
}

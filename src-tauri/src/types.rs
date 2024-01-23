use std::sync::Mutex;

use imap::{Connection, Session};
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct LoginResponse {
    pub message: String,
}

#[derive(Serialize)]
pub struct FetchResponse {
    pub messages: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ServerInfo {
    pub account: String,
    pub password: String,
    pub server: String,
    pub port: u16,
    pub secret: String,
}

#[derive(Debug)]
pub struct ImapState {
    pub info: ServerInfo,
    pub session: Session<Connection>,
}

#[derive(Debug)]
pub struct AppState {
    pub imap: Mutex<Option<ImapState>>,
}

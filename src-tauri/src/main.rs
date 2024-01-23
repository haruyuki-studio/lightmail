// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod fetch;
mod login;
mod types;

use fetch::fetch::fetch_box;
use fetch::list::list_box;
use login::login::imap_login;
use tauri::Manager;
use window_vibrancy::{apply_blur, apply_vibrancy, NSVisualEffectMaterial};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn login(
    imap: types::ServerInfo,
    smtp: types::ServerInfo,
    state: tauri::State<'_, types::AppState>,
) -> Result<types::LoginResponse, String> {
    let s = state.imap.lock();

    match imap_login(imap.clone()) {
        Ok(x) => {
            *s.unwrap() = Some(types::ImapState {
                info: imap,
                session: x.unwrap(),
            });

            Ok(types::LoginResponse {
                message: String::from("Login successful"),
            })
        }
        Err(_) => Err("Login failed".to_string()),
    }
}

#[tauri::command]
async fn list(
    reference_name: Option<String>,
    mailbox_pattern: Option<String>,
    state: tauri::State<'_, types::AppState>,
) -> Result<Vec<String>, String> {
    println!("{:#?} {:#?}", reference_name, mailbox_pattern);
    match list_box(
        reference_name,
        mailbox_pattern,
        state.imap.lock().unwrap().as_mut().unwrap(),
    ) {
        Ok(x) => Ok(x),
        Err(e) => Err(e),
    }
}

#[tauri::command]
async fn fetch(state: tauri::State<'_, types::AppState>) -> Result<types::FetchResponse, String> {
    match fetch_box(
        state.imap.lock().unwrap().as_mut().unwrap(),
        &String::from("INBOX"),
    ) {
        Ok(x) => Ok(types::FetchResponse { messages: x }),
        Err(e) => Err(e),
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_blur(&window, Some((18, 18, 18, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            Ok(())
        })
        .manage(types::AppState {
            imap: Default::default(),
        })
        .invoke_handler(tauri::generate_handler![greet, login, fetch, list])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

# 🎒 Trainers Web Plus

A browser extension built with **WXT**, **React**, **TypeScript**, and **Vite** that enhances UX for [Pokemon TCG Asia](https://asia.pokemon-card.com/), locally known as Trainers Web.

## 🌟 Key Features

1. **Ease of Use**
   - Just install the extension and use the website as is.
   - No extra steps needed to make anything work. The extension does all the heavy lifting for you.

2. **Enhanced Event Search**
   - Easily track which event status on the event search module without moving to a new page.
   - Visually distinct styling for each registration status: `Registered`, `Elected`, and `Declined`

3. **Streamlined Event Registration**
   - Adds an "Auto Register" button that lets you register for an event with a single click
   - Note: Defaults to unchecking the `Receive Email Notification` checkbox

4. **Events Dashboard**
   - View all your registered events easily with the extension's popup dashboard
   - At a glance, see how many events you've registered to, how many events you've been elected, and how many you've been declined
   - Easily search through events by using the built-in filters for registration status or event details

5. **Deck Builder Improvments**
   - Enables pressing `Enter` to search for cards
   - Import decklists from TCG Live or Limitless directly

---

## 🚀 How to Install and Use in Google Chrome

1. **Build the extension**:
   ```bash
   pnpm run build
   ```
2. **Load the Unpacked extension**:
   - Open Google Chrome and navigate to `chrome://extensions/`.
   - Toggle **Developer mode** in the top-right corner.
   - Click **Load unpacked** in the top-left corner.
   - Select the `build/chrome-mv3` folder inside this project directory.
3. **Sync your events**:
   - Click the **Trainers Web Plus** icon in your extensions list.
   - Select a country (e.g. Philippines) from the "Go to official My Page" dropdown.
   - Once logged in, load the "My Page" page (`https://asia.pokemon-card.com/ph/mypage/`).
   - A toast will confirm syncing. Your events will now show up on all search result pages and in your extension popup!

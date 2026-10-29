# CodeSteps Android — Python Basics

An offline-first React Native / Expo Android learning app for first-time Python learners. It includes four micro-lessons, English and Tamil lesson text, quizzes with explanations, local progress tracking, and an in-app privacy page. It has no sign-in, analytics, ads, or payment code.

## What is included

- Expo SDK 57 project configured for Android API 36
- English/Tamil lesson toggle and four interactive lessons
- Quiz feedback and local progress saved on the device
- 1024×1024 Play icon and adaptive launcher icon
- In-app and draft web privacy policies
- Draft Play Store listing text
- EAS profiles for an installable APK preview and production Android App Bundle (.aab)

## Run locally

Requires Node.js 22.13.x or newer and an Expo account for cloud builds.

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go on Android to preview. For a production-style Android build, use EAS Build below.

## Build an Android App Bundle

Expo SDK 57 targets Android API 36, matching Google Play's new-app target requirement from 31 August 2026.

1. Install EAS CLI: `npm install --global eas-cli`
2. Sign in: `eas login`
3. Run `eas build:configure` and keep the generated EAS project ID in `app.json`.
4. Build: `eas build --platform android --profile production`
5. Download the `.aab` from the EAS build page when it completes.

An Expo account and an Android build are still needed; this source archive does not contain a signed `.aab`.

## Google Play release checklist

1. Register for Play Console (currently a US$25 one-time fee) and complete developer identity verification.
2. Complete any required Android-device verification for your personal developer account.
3. Confirm `com.divya.seerangan.codesteps` is available before the first Play upload. You can change it before release, but not after publishing under that ID.
4. Replace the privacy-policy contact placeholder with a real support contact and host `privacy-policy.html` at a public HTTPS URL. Google requires the privacy-policy link in the store listing and inside the app, even when the app does not collect user data.
5. Add phone screenshots, store description, content rating, target-audience selection, Data safety form, and developer contact details.
6. Upload the `.aab` to an internal test and check it on real Android phones.
7. For a new personal developer account created after 13 November 2023, Google currently requires a closed test with at least 12 opted-in testers for 14 continuous days before you can apply for production access.
8. Apply for production access and submit the app for review. Google decides whether to approve it.

## Before release

- Ask a fluent Tamil speaker to review the Tamil lesson text and UI labels.
- Keep the privacy policy and Data safety declarations in sync with the exact app version and any bundled SDKs.
- This MVP has no paid digital content. If you later sell lessons or digital courses inside the Android app, check Google Play Billing rules and add the required purchase flow.

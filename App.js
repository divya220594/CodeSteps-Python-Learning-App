import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'codesteps-completed-v1';

const LESSONS = [
  {
    id: 'print', icon: '✦', en: {
      title: 'Make Python speak', tag: 'THE BASICS', time: '2 min',
      summary: 'Show a message on the screen with print().',
      idea: 'A computer follows instructions exactly. In Python, print() displays something on the screen. Put text inside quotation marks.',
      code: 'print("Hello, world!")',
      note: 'The output is: Hello, world!',
      question: 'Which line displays the words Hi there?',
      options: ['print("Hi there")', 'show("Hi there")', 'say = "Hi there"'],
      answer: 0,
      explanation: 'Correct! print() displays the text inside the brackets.',
    }, ta: {
      title: 'Python-ஐ பேச வைப்போம்', tag: 'அடிப்படை', time: '2 நிமிடம்',
      summary: 'print() மூலம் திரையில் ஒரு செய்தியைக் காட்டலாம்.',
      idea: 'கணினி நாம் கொடுக்கும் கட்டளைகளைப் பின்பற்றும். Python-இல் print() திரையில் ஒரு செய்தியைக் காட்டும். உரையை மேற்கோள் குறிகளுக்குள் எழுதுங்கள்.',
      note: 'திரையில் வரும் செய்தி: Hello, world!',
      question: 'Hi there என்று காட்டும் சரியான வரி எது?',
      options: ['print("Hi there")', 'show("Hi there")', 'say = "Hi there"'],
      explanation: 'சரி! print() அடைப்புக்குறிக்குள் உள்ள உரையைக் காட்டும்.',
    },
  },
  {
    id: 'variables', icon: '◈', en: {
      title: 'Save a value', tag: 'VARIABLES', time: '3 min',
      summary: 'Give information a name so you can use it again.',
      idea: 'A variable is a name connected to a value. Use one equals sign (=) to store a value. Text uses quotation marks; numbers do not.',
      code: 'name = "Mina"\nage = 12\nprint(name)',
      note: 'Python remembers the value linked to each name.',
      question: 'How do you store the number 8 in a variable called score?',
      options: ['score == 8', 'score = 8', '8 = score'],
      answer: 1,
      explanation: 'Yes. A single = stores the value on the right under the name on the left.',
    }, ta: {
      title: 'ஒரு மதிப்பைச் சேமிக்கவும்', tag: 'மாறிகள்', time: '3 நிமிடம்',
      summary: 'தகவலுக்கு ஒரு பெயர் கொடுத்து மீண்டும் பயன்படுத்துங்கள்.',
      idea: 'மாறி என்பது ஒரு மதிப்புடன் இணைக்கப்பட்ட பெயர். மதிப்பைச் சேமிக்க ஒரு = குறியைப் பயன்படுத்துங்கள். உரைக்கு மேற்கோள் குறிகள் தேவை; எண்களுக்கு தேவையில்லை.',
      note: 'ஒவ்வொரு பெயருடன் இணைந்த மதிப்பை Python நினைவில் வைத்திருக்கும்.',
      question: 'score என்ற மாறியில் 8-ஐ எப்படிச் சேமிப்பீர்கள்?',
      options: ['score == 8', 'score = 8', '8 = score'],
      explanation: 'சரி. வலப்புற மதிப்பை இடப்புறப் பெயரில் சேமிக்க ஒரு = குறி பயன்படும்.',
    },
  },
  {
    id: 'conditions', icon: '◇', en: {
      title: 'Make a choice', tag: 'IF STATEMENTS', time: '3 min',
      summary: 'Let your program choose what to do.',
      idea: 'An if statement runs code only when a condition is true. The indented line belongs to the if block.',
      code: 'weather = "sunny"\nif weather == "sunny":\n    print("Go outside!")',
      note: 'The double equals (==) checks whether two values match.',
      question: 'What does age >= 18 check?',
      options: ['Age is greater than or equal to 18', 'Age is exactly 18', 'It changes age to 18'],
      answer: 0,
      explanation: 'Right. >= means greater than or equal to.',
    }, ta: {
      title: 'ஒரு முடிவை எடுக்கவும்', tag: 'நிபந்தனைகள்', time: '3 நிமிடம்',
      summary: 'என்ன செய்ய வேண்டும் என்று நிரல் தேர்வு செய்யட்டும்.',
      idea: 'ஒரு நிபந்தனை உண்மையாக இருக்கும் போது மட்டுமே if கட்டளைக்குள் உள்ள குறியீடு இயங்கும். உள்தள்ளி எழுதப்பட்ட வரி if பகுதியைச் சேர்ந்தது.',
      note: 'இரண்டு == குறிகள் இரண்டு மதிப்புகள் சமமா என்று சரிபார்க்கும்.',
      question: 'age >= 18 எதைச் சரிபார்க்கிறது?',
      options: ['வயது 18-க்கு சமம் அல்லது அதிகம்', 'வயது சரியாக 18', 'வயதை 18 ஆக மாற்றும்'],
      explanation: 'சரி. >= என்பது சமம் அல்லது அதிகம் என்று பொருள்.',
    },
  },
  {
    id: 'loops', icon: '↻', en: {
      title: 'Repeat with a loop', tag: 'LOOPS', time: '3 min',
      summary: 'Repeat an instruction without writing it again and again.',
      idea: 'A for loop repeats an instruction for each value in a sequence. range(3) produces 0, 1, and 2—three turns.',
      code: 'for step in range(3):\n    print("Keep going!")',
      note: 'The indented line runs once on each turn of the loop.',
      question: 'How many times does range(4) repeat a for loop?',
      options: ['3 times', '4 times', '5 times'],
      answer: 1,
      explanation: 'Exactly four times: range(4) gives 0, 1, 2, and 3.',
    }, ta: {
      title: 'சுழற்சியைப் பயன்படுத்துங்கள்', tag: 'சுழற்சிகள்', time: '3 நிமிடம்',
      summary: 'ஒரே கட்டளையை மீண்டும் எழுதாமல் பல முறை இயக்குங்கள்.',
      idea: 'ஒரு for சுழற்சி வரிசையில் உள்ள ஒவ்வொரு மதிப்புக்கும் ஒரு கட்டளையை மீண்டும் இயக்கும். range(3) என்பது 0, 1, 2 ஆகிய மூன்று மதிப்புகளைத் தரும்.',
      note: 'சுழற்சியின் ஒவ்வொரு முறையும் உள்தள்ளிய வரி ஒருமுறை இயங்கும்.',
      question: 'range(4) என்றால் for சுழற்சி எத்தனை முறை இயங்கும்?',
      options: ['3 முறை', '4 முறை', '5 முறை'],
      answer: 1,
      explanation: 'சரியாக நான்கு முறை: range(4) என்பது 0, 1, 2, 3 ஆகிய மதிப்புகளைத் தரும்.',
    },
  },
];

const COPY = {
  en: {
    beginner: 'PYTHON FOR BEGINNERS', title: 'Small steps. Real progress.',
    intro: 'Learn Python basics with short lessons and quick practice. No setup needed.',
    start: 'Continue learning', path: 'Your learning path', progress: 'Your progress',
    completed: 'complete', lesson: 'LESSON', idea: 'The idea', try: 'Quick check',
    check: 'Check answer', next: 'Next lesson', finish: 'Finish path', retry: 'Try again',
    well: 'You did it!', all: 'You have completed the starter path.', again: 'Review a lesson',
    privacy: 'Privacy', offline: 'Works offline · Progress stays on this device',
    language: 'தமிழ்', back: 'Back to lessons', correct: 'Great work!',
    choose: 'Choose an answer to continue.',
  },
  ta: {
    beginner: 'தொடக்கநிலை பயனர்களுக்கான PYTHON', title: 'சிறிய படிகள். உண்மையான முன்னேற்றம்.',
    intro: 'சிறு பாடங்களும் பயிற்சிகளும் மூலம் Python அடிப்படைகளை கற்றுக்கொள்ளுங்கள்.',
    start: 'தொடர்ந்து கற்கவும்', path: 'உங்கள் கற்றல் பாதை', progress: 'உங்கள் முன்னேற்றம்',
    completed: 'முடிந்தது', lesson: 'பாடம்', idea: 'கருத்து', try: 'விரைவு வினா',
    check: 'பதிலைச் சரிபார்க்கவும்', next: 'அடுத்த பாடம்', finish: 'பாதையை முடிக்கவும்', retry: 'மீண்டும் முயற்சி',
    well: 'நன்றாகச் செய்தீர்கள்!', all: 'தொடக்கநிலைப் பாதையை முடித்துவிட்டீர்கள்.', again: 'ஒரு பாடத்தை மீண்டும் படிக்கவும்',
    privacy: 'தனியுரிமை', offline: 'இணையமின்றியும் இயங்கும் · முன்னேற்றம் இந்தச் சாதனத்தில் மட்டும்',
    language: 'English', back: 'பாடங்களுக்குத் திரும்பு', correct: 'அருமை!',
    choose: 'தொடர ஒரு பதிலைத் தேர்வு செய்யுங்கள்.',
  },
};

export default function App() {
  const [language, setLanguage] = useState('en');
  const [screen, setScreen] = useState('home');
  const [lessonIndex, setLessonIndex] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => stored && setCompleted(JSON.parse(stored)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const t = COPY[language];
  const lesson = LESSONS[lessonIndex];
  const data = lesson[language];
  const progress = Math.round((completed.length / LESSONS.length) * 100);

  const persistCompleted = async (items) => {
    setCompleted(items);
    try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (_) {}
  };

  const openLesson = (index) => {
    setLessonIndex(index);
    setSelected(null);
    setScreen('lesson');
  };

  const finishLesson = async () => {
    if (selected !== lesson.en.answer) { setSelected(null); return; }
    const updated = completed.includes(lesson.id) ? completed : [...completed, lesson.id];
    await persistCompleted(updated);
    setScreen(lessonIndex === LESSONS.length - 1 ? 'complete' : 'home');
    setSelected(null);
  };

  const resetProgress = async () => {
    await persistCompleted([]);
    setScreen('home');
  };

  if (loading) {
    return <SafeAreaView style={styles.loading}><StatusBar barStyle="dark-content" backgroundColor={C.paper} /><ActivityIndicator color={C.green} /></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={C.paper} />
      <View style={styles.topbar}>
        <Pressable style={styles.brandRow} onPress={() => setScreen('home')} accessibilityRole="button" accessibilityLabel="CodeSteps home">
          <View style={styles.logo}><Text style={styles.logoText}>{'{ }'}</Text></View>
          <Text style={styles.brand}>CodeSteps</Text>
        </Pressable>
        <Pressable style={styles.languageButton} onPress={() => setLanguage(language === 'en' ? 'ta' : 'en')} accessibilityRole="button">
          <Text style={styles.languageText}>{t.language}</Text>
        </Pressable>
      </View>

      {screen === 'home' && (
        <ScrollView contentContainerStyle={styles.page}>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>{t.beginner}</Text>
            <Text style={styles.heroTitle}>{t.title}</Text>
            <Text style={styles.heroCopy}>{t.intro}</Text>
            <Pressable style={styles.primaryButton} onPress={() => { const nextIndex = LESSONS.findIndex((item) => !completed.includes(item.id)); openLesson(nextIndex < 0 ? 0 : nextIndex); }} accessibilityRole="button">
              <Text style={styles.primaryButtonText}>{t.start}  →</Text>
            </Pressable>
            <View style={styles.heroDecor}><Text style={styles.decorText}>{'print("hello")'}</Text><Text style={styles.decorSub}># start where you are</Text></View>
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>{t.path}</Text>
            <Text style={styles.progressLabel}>{completed.length}/{LESSONS.length} {t.completed}</Text>
          </View>
          <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${progress}%` }]} /></View>

          <View style={styles.lessonList}>
            {LESSONS.map((item, index) => {
              const itemData = item[language];
              const done = completed.includes(item.id);
              return (
                <Pressable key={item.id} style={({ pressed }) => [styles.lessonCard, pressed && styles.pressed]} onPress={() => openLesson(index)} accessibilityRole="button">
                  <View style={[styles.lessonIcon, done && styles.lessonIconDone]}><Text style={styles.lessonIconText}>{done ? '✓' : item.icon}</Text></View>
                  <View style={styles.lessonCardText}>
                    <Text style={styles.lessonTag}>{itemData.tag}</Text>
                    <Text style={styles.lessonName}>{itemData.title}</Text>
                    <Text style={styles.lessonSummary}>{itemData.summary}</Text>
                  </View>
                  <Text style={styles.chevron}>{done ? '✓' : '›'}</Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.privacyNote}><Text style={styles.privacyIcon}>◉</Text><Text style={styles.privacyText}>{t.offline}</Text></View>
          <Pressable onPress={() => setScreen('privacy')} style={styles.privacyLink}><Text style={styles.privacyLinkText}>{t.privacy}</Text></Pressable>
        </ScrollView>
      )}

      {screen === 'lesson' && (
        <ScrollView contentContainerStyle={styles.page}>
          <Pressable onPress={() => setScreen('home')} style={styles.backButton}><Text style={styles.backText}>‹  {t.back}</Text></Pressable>
          <View style={styles.lessonHeading}>
            <Text style={styles.eyebrow}>{t.lesson} {lessonIndex + 1} · {data.tag}</Text>
            <Text style={styles.lessonTitle}>{data.title}</Text>
            <Text style={styles.lessonSummaryLarge}>{data.summary}</Text>
          </View>
          <View style={styles.conceptCard}>
            <Text style={styles.cardHeading}>{t.idea}</Text>
            <Text style={styles.bodyText}>{data.idea}</Text>
            <View style={styles.codeBox}><Text style={styles.codeText}>{lesson.en.code}</Text></View>
            <Text style={styles.bodyText}>{data.note}</Text>
          </View>
          <View style={styles.quizCard}>
            <Text style={styles.eyebrow}>{t.try}</Text>
            <Text style={styles.question}>{data.question}</Text>
            {data.options.map((option, index) => {
              const isSelected = selected === index;
              const isCorrect = selected !== null && lesson.en.answer === index;
              return (
                <Pressable key={`${lesson.id}-${index}`} style={[styles.answer, isSelected && (isCorrect ? styles.answerCorrect : styles.answerWrong), !isSelected && isCorrect && selected !== null && styles.answerCorrect]} onPress={() => selected === null && setSelected(index)} accessibilityRole="button">
                  <View style={styles.radio}>{isSelected ? <View style={[styles.radioDot, isCorrect ? styles.radioDotGreen : styles.radioDotRed]} /> : null}</View>
                  <Text style={styles.answerText}>{option}</Text>
                </Pressable>
              );
            })}
            <Text style={[styles.feedback, selected !== null && (selected === lesson.en.answer ? styles.feedbackCorrect : styles.feedbackWrong)]} accessibilityLiveRegion="polite">
              {selected === null ? t.choose : selected === lesson.en.answer ? `${t.correct} ${data.explanation}` : data.explanation}
            </Text>
            <Pressable style={[styles.primaryButton, selected === null && styles.disabledButton]} onPress={finishLesson} disabled={selected === null} accessibilityRole="button">
              <Text style={styles.primaryButtonText}>{selected === null ? t.check : selected !== lesson.en.answer ? t.retry : lessonIndex === LESSONS.length - 1 ? t.finish : t.next}  →</Text>
            </Pressable>
          </View>
        </ScrollView>
      )}

      {screen === 'complete' && (
        <View style={styles.completePage}>
          <View style={styles.completeBadge}><Text style={styles.completeEmoji}>✦</Text></View>
          <Text style={styles.eyebrow}>{t.beginner}</Text>
          <Text style={styles.completeTitle}>{t.well}</Text>
          <Text style={styles.completeCopy}>{t.all}</Text>
          <Pressable style={styles.primaryButton} onPress={() => openLesson(0)} accessibilityRole="button"><Text style={styles.primaryButtonText}>{t.again}  →</Text></Pressable>
          <Pressable style={styles.secondaryButton} onPress={resetProgress} accessibilityRole="button"><Text style={styles.secondaryButtonText}>{language === 'en' ? 'Reset progress' : 'முன்னேற்றத்தை மீட்டமை'}</Text></Pressable>
        </View>
      )}

      {screen === 'privacy' && (
        <ScrollView contentContainerStyle={styles.page}>
          <Pressable onPress={() => setScreen('home')} style={styles.backButton}><Text style={styles.backText}>‹  {t.back}</Text></Pressable>
          <Text style={styles.eyebrow}>{t.privacy.toUpperCase()}</Text>
          <Text style={styles.lessonTitle}>{language === 'en' ? 'Your learning stays yours.' : 'உங்கள் கற்றல் உங்களிடமே இருக்கும்.'}</Text>
          <View style={styles.conceptCard}>
            <Text style={styles.bodyText}>{language === 'en' ? 'CodeSteps does not ask for an account and does not collect or send personal information. Lesson progress is stored only on your device so you can continue later. The app contains no ads, analytics, location access, or payment processing.' : 'CodeSteps கணக்கு கேட்காது; தனிப்பட்ட தகவல்களைச் சேகரிக்கவோ அனுப்பவோ செய்யாது. பாட முன்னேற்றம் உங்கள் சாதனத்தில் மட்டும் சேமிக்கப்படும். விளம்பரம், பகுப்பாய்வு, இருப்பிட அணுகல் அல்லது பணம் செலுத்தும் வசதி இல்லை.'}</Text>
            <Text style={[styles.bodyText, { marginTop: 14 }]}>{language === 'en' ? 'If you uninstall the app or clear its storage, saved lesson progress may be removed. This policy applies to this version of CodeSteps.' : 'செயலியை நீக்கினாலோ அதன் சேமிப்பை அழித்தாலோ பாட முன்னேற்றம் நீக்கப்படலாம். இந்தக் கொள்கை CodeSteps-இன் இந்தப் பதிப்புக்குப் பொருந்தும்.'}</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const C = { paper: '#F6F2E9', card: '#FFFDFA', ink: '#18241E', muted: '#66736B', green: '#236B4A', light: '#DCECDF', lime: '#D6F273', line: '#E6E2D9', coral: '#F0A18A' };
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.paper }, loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.paper },
  topbar: { minHeight: 66, paddingHorizontal: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: C.line },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, logo: { width: 35, height: 35, borderRadius: 11, backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' }, logoText: { color: '#fff', fontWeight: '900', fontSize: 13 }, brand: { color: C.ink, fontSize: 19, fontWeight: '800', letterSpacing: -0.7 },
  languageButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: C.line, backgroundColor: C.card }, languageText: { color: C.green, fontWeight: '700', fontSize: 13 },
  page: { paddingHorizontal: 21, paddingTop: 22, paddingBottom: 40 }, hero: { backgroundColor: C.light, borderRadius: 24, padding: 23, overflow: 'hidden', marginBottom: 28 }, eyebrow: { color: C.green, fontSize: 11, fontWeight: '900', letterSpacing: 1.35 }, heroTitle: { color: C.ink, fontSize: 32, lineHeight: 37, fontWeight: '900', letterSpacing: -1.4, marginTop: 12, maxWidth: 340 }, heroCopy: { color: '#53645A', fontSize: 15, lineHeight: 22, marginTop: 12, marginBottom: 18, maxWidth: 330 },
  primaryButton: { minHeight: 49, borderRadius: 13, paddingHorizontal: 18, alignSelf: 'flex-start', backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' }, primaryButtonText: { color: '#fff', fontSize: 14, fontWeight: '800' }, disabledButton: { opacity: 0.48 }, heroDecor: { marginTop: 18, backgroundColor: '#1A2A20', borderRadius: 12, padding: 12 }, decorText: { color: '#D6F273', fontFamily: 'monospace', fontWeight: '700' }, decorSub: { color: '#A8B8AB', fontFamily: 'monospace', fontSize: 11, marginTop: 4 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }, sectionTitle: { color: C.ink, fontSize: 18, fontWeight: '800' }, progressLabel: { color: C.muted, fontSize: 12, fontWeight: '700' }, progressTrack: { height: 8, backgroundColor: '#E5E1D8', borderRadius: 8, overflow: 'hidden', marginBottom: 15 }, progressFill: { height: 8, backgroundColor: C.green, borderRadius: 8 },
  lessonList: { gap: 10 }, lessonCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 14, minHeight: 95 }, pressed: { opacity: 0.78 }, lessonIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: C.light, justifyContent: 'center', alignItems: 'center', marginRight: 12 }, lessonIconDone: { backgroundColor: C.green }, lessonIconText: { color: C.green, fontWeight: '900', fontSize: 17 }, lessonCardText: { flex: 1 }, lessonTag: { color: C.green, fontWeight: '900', fontSize: 9, letterSpacing: 1 }, lessonName: { color: C.ink, fontWeight: '800', fontSize: 15, marginTop: 3 }, lessonSummary: { color: C.muted, fontSize: 12, lineHeight: 17, marginTop: 3 }, chevron: { color: C.green, fontSize: 23, fontWeight: '700', paddingLeft: 8 }, privacyNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 22, gap: 8 }, privacyIcon: { color: C.green, fontWeight: '900' }, privacyText: { color: C.muted, fontSize: 11, textAlign: 'center' }, privacyLink: { alignSelf: 'center', padding: 12, marginTop: 2 }, privacyLinkText: { color: C.green, fontSize: 12, fontWeight: '700' },
  backButton: { alignSelf: 'flex-start', paddingVertical: 7, paddingRight: 12, marginBottom: 20 }, backText: { color: C.green, fontSize: 14, fontWeight: '750' }, lessonHeading: { marginBottom: 20 }, lessonTitle: { color: C.ink, fontSize: 29, lineHeight: 34, letterSpacing: -1, fontWeight: '900', marginTop: 8 }, lessonSummaryLarge: { color: C.muted, fontSize: 15, lineHeight: 22, marginTop: 8 }, conceptCard: { backgroundColor: C.card, borderRadius: 18, borderWidth: 1, borderColor: C.line, padding: 18, marginBottom: 14 }, cardHeading: { color: C.ink, fontSize: 16, fontWeight: '800', marginBottom: 8 }, bodyText: { color: '#536158', fontSize: 14, lineHeight: 22 }, codeBox: { backgroundColor: '#1A2A20', borderRadius: 12, padding: 15, marginVertical: 14 }, codeText: { color: '#E7F0E5', fontFamily: 'monospace', fontSize: 13, lineHeight: 21 }, quizCard: { backgroundColor: C.card, borderWidth: 1, borderColor: C.line, borderRadius: 18, padding: 18 }, question: { color: C.ink, fontWeight: '800', fontSize: 17, lineHeight: 23, marginTop: 8, marginBottom: 13 }, answer: { backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: C.line, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 13, marginBottom: 8 }, answerCorrect: { backgroundColor: '#EFF8EF', borderColor: '#72AE82' }, answerWrong: { backgroundColor: '#FFF1ED', borderColor: '#D98D7C' }, radio: { width: 19, height: 19, borderRadius: 10, borderWidth: 1.5, borderColor: '#99A39A', alignItems: 'center', justifyContent: 'center', marginRight: 10 }, radioDot: { width: 9, height: 9, borderRadius: 5 }, radioDotGreen: { backgroundColor: C.green }, radioDotRed: { backgroundColor: '#A94F43' }, answerText: { color: C.ink, fontSize: 13, fontWeight: '600', flex: 1, lineHeight: 19 }, feedback: { color: C.muted, fontSize: 12, lineHeight: 18, marginVertical: 7, minHeight: 20 }, feedbackCorrect: { color: C.green }, feedbackWrong: { color: '#8D493E' },
  completePage: { flex: 1, padding: 25, alignItems: 'center', justifyContent: 'center' }, completeBadge: { width: 76, height: 76, borderRadius: 28, backgroundColor: C.lime, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }, completeEmoji: { fontSize: 36, color: C.green }, completeTitle: { color: C.ink, fontSize: 32, fontWeight: '900', letterSpacing: -1, marginTop: 10 }, completeCopy: { color: C.muted, fontSize: 15, textAlign: 'center', lineHeight: 22, marginTop: 8, marginBottom: 20, maxWidth: 330 }, secondaryButton: { padding: 12, marginTop: 7 }, secondaryButtonText: { color: C.green, fontWeight: '700', fontSize: 13 },
});

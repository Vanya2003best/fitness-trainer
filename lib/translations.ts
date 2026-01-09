export type Language = 'ru' | 'pl'

export const translations = {
  // Navigation
  nav: {
    services: { ru: 'Услуги', pl: 'Usługi' },
    about: { ru: 'О тренере', pl: 'O trenerze' },
    pricing: { ru: 'Цены', pl: 'Cennik' },
    plan: { ru: 'План', pl: 'Plan' },
    contacts: { ru: 'Контакты', pl: 'Kontakt' },
    book: { ru: 'Записаться', pl: 'Umów się' },
  },

  // Hero
  hero: {
    title: { ru: 'Персональный тренер', pl: 'Trener personalny' },
    location: { ru: 'в Варшаве', pl: 'w Warszawie' },
    subtitle: { ru: 'Говорю на твоём языке. Помогу достичь твоих целей.', pl: 'Mówię po rosyjsku i polsku. Pomogę Ci osiągnąć cele.' },
    freePlan: { ru: 'Бесплатный план тренировок', pl: 'Darmowy plan treningowy' },
    cta: { ru: 'Получить бесплатный план', pl: 'Otrzymaj darmowy plan' },
    learnMore: { ru: 'Узнать больше', pl: 'Dowiedz się więcej' },
    yearsInSport: { ru: 'лет в спорте', pl: 'lat w sporcie' },
    certificate: { ru: 'сертификат', pl: 'certyfikat' },
    individual: { ru: 'индивидуально', pl: 'indywidualnie' },
  },

  // Services
  services: {
    title: { ru: 'Услуги', pl: 'Usługi' },
    subtitle: { ru: 'Выбери формат, который подходит именно тебе', pl: 'Wybierz format, który Ci odpowiada' },
    viewPricing: { ru: 'Смотреть цены', pl: 'Zobacz cennik' },
    personal: {
      title: { ru: 'Персональные тренировки', pl: 'Treningi personalne' },
      description: {
        ru: 'Индивидуальные занятия в зале или на свежем воздухе. Программа под твои цели, контроль техники, мотивация.',
        pl: 'Indywidualne zajęcia na siłowni lub na świeżym powietrzu. Program dostosowany do Twoich celów, kontrola techniki, motywacja.'
      },
      features: {
        ru: ['Индивидуальная программа', 'Работа над техникой', 'Гибкий график', 'Результат уже через месяц'],
        pl: ['Indywidualny program', 'Praca nad techniką', 'Elastyczny grafik', 'Efekty już po miesiącu']
      }
    },
    online: {
      title: { ru: 'Онлайн программы', pl: 'Programy online' },
      description: {
        ru: 'Персональный план тренировок с поддержкой в мессенджере. Идеально если у тебя свой график.',
        pl: 'Personalny plan treningowy ze wsparciem w komunikatorze. Idealny jeśli masz własny grafik.'
      },
      features: {
        ru: ['План тренировок на месяц', 'Видео-разбор упражнений', 'Поддержка в чате 24/7', 'Корректировка программы'],
        pl: ['Plan treningowy na miesiąc', 'Wideo z ćwiczeniami', 'Wsparcie na czacie 24/7', 'Korekta programu']
      }
    }
  },

  // About
  about: {
    title: { ru: 'О тренере', pl: 'O trenerze' },
    subtitle: { ru: '15+ лет в спорте. Вот что я могу без подготовки:', pl: '15+ lat w sporcie. Oto co potrafię bez przygotowania:' },
    stats: {
      pushups: { ru: 'Отжимания', pl: 'Pompki' },
      squats: { ru: 'Приседания', pl: 'Przysiady' },
      pullups: { ru: 'Подтягивания', pl: 'Podciągnięcia' },
      halfMarathon: { ru: 'Полумарафон', pl: 'Półmaraton' },
    },
    sportIsLife: { ru: 'Спорт - это моя жизнь', pl: 'Sport to moje życie' },
    aboutText1: {
      ru: 'С 4 лет занимаюсь спортом. Прошёл путь от детских секций до профессиональных соревнований. Помогаю людям найти путь к здоровому и сильному телу.',
      pl: 'Od 4 roku życia uprawiam sport. Przeszedłem drogę od sekcji dziecięcych do zawodów profesjonalnych. Pomagam ludziom znaleźć drogę do zdrowego i silnego ciała.'
    },
    aboutText2: {
      ru: 'Говорю на твоём языке - понимаю, каково начинать с нуля или возвращаться после перерыва. Вместе достигнем твоих целей.',
      pl: 'Mówię w Twoim języku - rozumiem, jak to jest zaczynać od zera lub wracać po przerwie. Razem osiągniemy Twoje cele.'
    },
    myExperience: { ru: 'Мои достижения', pl: 'Moje osiągnięcia' },
    experienceItems: [
      { text: { ru: 'Единоборства (борьба, бокс)', pl: 'Sztuki walki (zapasy, boks)' }, detail: { ru: 'призовые места', pl: 'miejsca medalowe' } },
      { text: { ru: 'Лыжи - 1 взрослый разряд', pl: 'Narciarstwo - 1 klasa' }, detail: { ru: 'коньковый стиль', pl: 'styl łyżwowy' } },
      { text: { ru: 'Полумарафон 21 км', pl: 'Półmaraton 21 km' }, detail: { ru: '13 место', pl: '13 miejsce' } },
      { text: { ru: 'Сертификат GSA', pl: 'Certyfikat GSA' }, detail: { ru: 'Польша', pl: 'Polska' } },
    ]
  },

  // Pricing
  pricing: {
    title: { ru: 'Цены', pl: 'Cennik' },
    subtitle: { ru: 'Низкие цены — это круто! Начни путь к форме без удара по кошельку.', pl: 'Niskie ceny — to świetnie! Zacznij drogę do formy bez obciążania portfela.' },
    popular: { ru: 'Популярный', pl: 'Popularny' },
    packages: {
      trial: {
        name: { ru: 'Пробная тренировка', pl: 'Trening próbny' },
        price: { ru: 'Бесплатно', pl: 'Za darmo' },
        description: { ru: 'Познакомимся и определим твои цели', pl: 'Poznamy się i określimy Twoje cele' },
        features: {
          ru: ['Оценка физической формы', 'Составление плана действий', 'Ответы на все вопросы'],
          pl: ['Ocena formy fizycznej', 'Opracowanie planu działania', 'Odpowiedzi na wszystkie pytania']
        },
        cta: { ru: 'Записаться', pl: 'Umów się' }
      },
      single: {
        name: { ru: 'Персональная тренировка', pl: 'Trening personalny' },
        description: { ru: 'Индивидуальное занятие 1 на 1', pl: 'Indywidualne zajęcia 1 na 1' },
        features: {
          ru: ['Длительность 60 минут', 'Индивидуальная программа', 'Контроль техники', 'Мотивация и поддержка'],
          pl: ['Czas trwania 60 minut', 'Indywidualny program', 'Kontrola techniki', 'Motywacja i wsparcie']
        },
        cta: { ru: 'Записаться', pl: 'Umów się' }
      },
      package: {
        name: { ru: 'Пакет 10 тренировок', pl: 'Pakiet 10 treningów' },
        description: { ru: 'Выгодно для регулярных занятий', pl: 'Opłacalny dla regularnych ćwiczeń' },
        features: {
          ru: ['10 персональных тренировок', 'Экономия 150 zł', 'Гибкий график', 'План питания в подарок'],
          pl: ['10 treningów personalnych', 'Oszczędność 150 zł', 'Elastyczny grafik', 'Plan żywieniowy gratis']
        },
        cta: { ru: 'Выбрать пакет', pl: 'Wybierz pakiet' }
      },
      online: {
        name: { ru: 'Онлайн программа', pl: 'Program online' },
        description: { ru: 'Тренируйся где удобно', pl: 'Ćwicz gdzie chcesz' },
        features: {
          ru: ['План тренировок на месяц', 'Видео упражнений', 'Поддержка в чате', 'Еженедельная корректировка'],
          pl: ['Plan treningowy na miesiąc', 'Wideo z ćwiczeniami', 'Wsparcie na czacie', 'Cotygodniowa korekta']
        },
        cta: { ru: 'Начать', pl: 'Zacznij' }
      }
    },
    honesty: {
      line1: {
        ru: 'Честно скажу — я начинающий тренер, но у меня',
        pl: 'Szczerze mówiąc — jestem początkującym trenerem, ale mam'
      },
      experience: { ru: '15+ лет личного опыта в спорте', pl: '15+ lat osobistego doświadczenia w sporcie' },
      line2: { ru: 'и', pl: 'i' },
      gsaCertificate: { ru: 'сертификат GSA', pl: 'certyfikat GSA' },
      line3: {
        ru: 'Буду стараться на 1000%, и вместе мы добьёмся твоих целей. Поэтому и цены такие доступные!',
        pl: 'Dam z siebie 1000%, a razem osiągniemy Twoje cele. Dlatego ceny są tak przystępne!'
      }
    },
    payment: { ru: 'Возможна оплата наличными или переводом. Есть скидки для студентов.', pl: 'Płatność gotówką lub przelewem. Zniżki dla studentów.' }
  },

  // Workout Generator
  generator: {
    title: { ru: 'Бесплатный план тренировок', pl: 'Darmowy plan treningowy' },
    subtitle: { ru: 'Darmowy plan treningowy / Free workout plan', pl: 'Darmowy plan treningowy / Free workout plan' },
    description: { ru: 'Заполни форму и получи персональный план тренировок за 30 секунд.', pl: 'Wypełnij formularz i otrzymaj personalny plan treningowy w 30 sekund.' },
    free: { ru: '100% бесплатно!', pl: '100% za darmo!' },
    goal: { ru: 'Твоя цель', pl: 'Twój cel' },
    goalPlaceholder: { ru: 'Выбери цель', pl: 'Wybierz cel' },
    goals: {
      lose_weight: { ru: 'Похудеть', pl: 'Schudnąć' },
      build_muscle: { ru: 'Набрать мышцы', pl: 'Zbudować mięśnie' },
      get_fit: { ru: 'Улучшить форму', pl: 'Poprawić formę' },
      strength: { ru: 'Стать сильнее', pl: 'Stać się silniejszym' },
      endurance: { ru: 'Выносливость', pl: 'Wytrzymałość' },
      other: { ru: 'Другое', pl: 'Inne' },
    },
    customGoalPlaceholder: { ru: 'Опиши свою цель...', pl: 'Opisz swój cel...' },
    level: { ru: 'Уровень подготовки', pl: 'Poziom zaawansowania' },
    levelPlaceholder: { ru: 'Выбери уровень', pl: 'Wybierz poziom' },
    levels: {
      beginner: { ru: 'Новичок', pl: 'Początkujący' },
      intermediate: { ru: 'Средний', pl: 'Średniozaawansowany' },
      advanced: { ru: 'Продвинутый', pl: 'Zaawansowany' },
    },
    days: { ru: 'Дней в неделю', pl: 'Dni w tygodniu' },
    daysUnit: { ru: 'дня', pl: 'dni' },
    daysUnitPlural: { ru: 'дней', pl: 'dni' },
    limitations: { ru: 'Ограничения или пожелания', pl: 'Ograniczenia lub preferencje' },
    limitationsPlaceholder: { ru: 'Больная спина, тренировки дома, без прыжков...', pl: 'Problemy z kręgosłupem, ćwiczenia w domu, bez skoków...' },
    submit: { ru: 'Получить план тренировок', pl: 'Otrzymaj plan treningowy' },
    loading: { ru: 'Генерирую план...', pl: 'Generuję plan...' },
    ready: { ru: 'Твой план готов!', pl: 'Twój plan gotowy!' },
    createNew: { ru: 'Создать новый', pl: 'Stwórz nowy' },
    warmup: { ru: 'Разминка', pl: 'Rozgrzewka' },
    mainPart: { ru: 'Основная часть', pl: 'Część główna' },
    cooldown: { ru: 'Заминка', pl: 'Rozciąganie' },
    tips: { ru: 'Советы по питанию и восстановлению', pl: 'Porady żywieniowe i regeneracyjne' },
    ctaText: { ru: 'Хочешь персональную программу с поддержкой тренера?', pl: 'Chcesz personalny program ze wsparciem trenera?' },
    ctaButton: { ru: 'Записаться на бесплатную консультацию', pl: 'Umów się na darmową konsultację' },
    error: { ru: 'Ошибка генерации. Попробуйте позже.', pl: 'Błąd generowania. Spróbuj później.' },
    errorGeneric: { ru: 'Произошла ошибка', pl: 'Wystąpił błąd' },
  },

  // Contacts
  contacts: {
    title: { ru: 'Записаться на тренировку', pl: 'Umów się na trening' },
    subtitle: { ru: 'Выбери удобный способ связи. Отвечу в течение часа.', pl: 'Wybierz wygodny sposób kontaktu. Odpowiem w ciągu godziny.' },
    telegram: { ru: 'Быстрый ответ', pl: 'Szybka odpowiedź' },
    whatsapp: { ru: 'Звонки и сообщения', pl: 'Połączenia i wiadomości' },
    instagram: { ru: 'Тренировки и результаты', pl: 'Treningi i wyniki' },
    free: { ru: 'Первая консультация - бесплатно', pl: 'Pierwsza konsultacja - za darmo' },
  },

  // Footer
  footer: {
    description: { ru: 'Персональный тренер в Варшаве. Тренировки на русском и польском языках.', pl: 'Trener personalny w Warszawie. Treningi po rosyjsku i polsku.' },
    rights: { ru: 'Все права защищены', pl: 'Wszelkie prawa zastrzeżone' },
    certified: { ru: 'Сертифицированный тренер GSA', pl: 'Certyfikowany trener GSA' },
  },

  // Booking modal
  booking: {
    title: { ru: 'Оформление заказа', pl: 'Zamówienie' },
    name: { ru: 'Имя', pl: 'Imię' },
    namePlaceholder: { ru: 'Как вас зовут?', pl: 'Jak masz na imię?' },
    phone: { ru: 'Телефон', pl: 'Telefon' },
    email: { ru: 'Email (необязательно)', pl: 'Email (opcjonalnie)' },
    paymentMethod: { ru: 'Способ оплаты', pl: 'Metoda płatności' },
    paymentContact: { ru: 'Свяжусь для оплаты', pl: 'Skontaktuję się w sprawie płatności' },
    paymentContactDesc: { ru: 'Тренер свяжется с вами для уточнения деталей', pl: 'Trener skontaktuje się z Tobą w sprawie szczegółów' },
    paymentBlik: { ru: 'BLIK / Перевод', pl: 'BLIK / Przelew' },
    paymentBlikDesc: { ru: 'Получите номер телефона для BLIK', pl: 'Otrzymasz numer telefonu do BLIK' },
    paymentCash: { ru: 'Наличными', pl: 'Gotówka' },
    paymentCashDesc: { ru: 'Оплата на первой тренировке', pl: 'Płatność na pierwszym treningu' },
    message: { ru: 'Комментарий', pl: 'Komentarz' },
    messagePlaceholder: { ru: 'Удобное время, пожелания...', pl: 'Preferowany czas, uwagi...' },
    submit: { ru: 'Отправить заявку', pl: 'Wyślij zgłoszenie' },
    submitPay: { ru: 'Оплатить', pl: 'Zapłać' },
    submitting: { ru: 'Отправка...', pl: 'Wysyłanie...' },
    successTitle: { ru: 'Заявка отправлена!', pl: 'Zgłoszenie wysłane!' },
    successMessage: { ru: 'Свяжусь с вами в течение часа', pl: 'Skontaktuję się z Tobą w ciągu godziny' },
    bankDetails: { ru: 'Для оплаты BLIK', pl: 'Do płatności BLIK' },
    blikPhone: { ru: 'Номер телефона для BLIK', pl: 'Numer telefonu do BLIK' },
    close: { ru: 'Закрыть', pl: 'Zamknij' },
  }
}

export function t(key: string, lang: Language): string {
  const keys = key.split('.')
  let result: any = translations
  for (const k of keys) {
    result = result?.[k]
  }
  return result?.[lang] || key
}

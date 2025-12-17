/**
 * Content Configuration
 * Edit all wedding content from this single file
 */

export const content = {
    // ========== COUPLE INFORMATION ==========
    couple: {
        groomFirstName: 'Fatih',
        groomFullName: 'Muhammad Fatih Abdus Salam',
        brideFirstName: 'Novel',
        brideFullName: 'Novel Aresty',
        coupleNames: 'Fatih & Novel', // Used in hero and footer
    },

    // ========== BACKGROUND MUSIC ==========
    music: {
        youtubeId: 'ZeFpigRaXbI', // Romantic Wedding Instrumental (Replaceable)
        volume: 100, // Default volume percentage
        autoplay: false, // Browsers often block autoplay, but we'll try
    },

    // ========== WEDDING DATE & TIME ==========
    wedding: {
        // IMPORTANT: Update this date for the countdown timer
        // Format: 'YYYY-MM-DDTHH:MM:SS+07:00' (for Jakarta timezone GMT+7)
        dateTime: '2026-01-17T08:00:00+07:00',

        // Display formats
        saveTheDate: 'Save the Date · 17 January 2026',
        ceremonyDate: 'Sabtu · 17 January 2026',
        ceremonyTime: '08:00 WIB',
        receptionDate: 'Sabtu · 17 January 2026',
        receptionTime: '11:00 WIB',
    },

    // ========== VENUE INFORMATION ==========
    venue: {
        ceremony: {
            location: 'Masjid Namira',
            address: 'Jl. Raya Mantup, Sanur, Jotosanur, Kec. Tikung, Kabupaten Lamongan, Jawa Timur 62281',
            googleMapsUrl: 'https://maps.app.goo.gl/MCrck2qGZZeWgJUe7',
        },
        reception: {
            location: 'Graha Bhineka Karya',
            address: 'Jl. Kusuma Bangsa, Beringin, Tumenggungan, Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62214',
            googleMapsUrl: 'https://maps.app.goo.gl/AKKtZe7CTsDD2xjg6',
        },
        dressCode: 'Formal · Black Tie Optional',
    },

    // ========== HERO SECTION ==========
    hero: {
        subtitle: 'A Celebration of Love',
    },

    // ========== SPIRITUAL SECTION ==========
    spiritual: {
        verse: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
        surah: 'QS. Ar-Rum: 21',
    },

    // ========== COUPLE SECTION ==========
    coupleSection: {
        title: 'The Couple',
        groom: {
            title: 'The Groom',
            bio: 'Putra pertama dari bapak Yayok Haryanto (Alm) dan ibu Nur Diana Novita Chusniah',
        },
        bride: {
            title: 'The Bride',
            bio: 'Putri kedua dari bapak Rudiyun dan ibu Roslinda',
        },
        story: {
            title: 'Our Story',
            text: 'Two hearts, one soul. Our journey began with a chance encounter that felt like destiny. Through laughter, dreams, and countless moments of joy, we discovered that love is not just a feeling—it\'s a promise. A promise to cherish, to support, and to grow together, hand in hand, for all the days of our lives.',
        },
    },

    // ========== EVENT SECTION ==========
    eventSection: {
        title: 'The Wedding',
        ceremony: {
            type: 'Akad Nikah',
        },
        reception: {
            type: 'Resepsi',
        },
        dressCodeLabel: 'Dress Code',
    },

    // ========== COUNTDOWN SECTION ==========
    countdownSection: {
        title: 'Save the Date',
        subtitle: 'Counting Down to Forever',
        labels: {
            days: 'Days',
            hours: 'Hours',
            minutes: 'Minutes',
            seconds: 'Seconds',
        },
    },

    // ========== GALLERY SECTION ==========
    gallerySection: {
        title: 'Gallery',
        // Placeholder labels - replace with actual image info when you add images
        images: [
            { label: 'Photo 1', alt: 'Wedding photo 1' },
            { label: 'Photo 2', alt: 'Wedding photo 2' },
            { label: 'Photo 3', alt: 'Wedding photo 3' },
            { label: 'Photo 4', alt: 'Wedding photo 4' },
            { label: 'Photo 5', alt: 'Wedding photo 5' },
            { label: 'Photo 6', alt: 'Wedding photo 6' },
        ],
    },

    // ========== GUEST BOOK SECTION ==========
    guestBookSection: {
        title: 'Share Your Wishes',
        subtitle: 'Leave a message for the happy couple',
        form: {
            nameLabel: 'Your Name',
            namePlaceholder: 'Jane Doe',
            messageLabel: 'Your Message',
            messagePlaceholder: 'Wishing you a lifetime of love and happiness...',
            submitButton: 'Send Wishes',
        },
    },

    // ========== GIFT SECTION ==========
    gift: {
        title: 'Kirim Hadiah',
        description: 'Bagi bapak/ibu/saudara/i yang ingin mengirimkan hadiah pernikahan dapat melalui rekening di bawah ini:',
        bankName: 'Bank BCA', // Edit this
        accountName: 'Muhammad Fatih Abdus Salam', // Edit this
        accountNumber: '1234567890', // Edit this
    },

    // ========== FOOTER ==========
    footer: {
        message: 'With gratitude and love, we look forward to celebrating with you.',
        meta: 'Made with Love · 2026',
    },
};

export default content;

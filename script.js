// Configuración de APIs
const API_CONFIG = {
    lastfm: {
        key: '48391754056a418bde4671e969d9eea1',
        baseUrl: 'https://ws.audioscrobbler.com/2.0/'
    },
    musicbrainz: {
        baseUrl: 'https://musicbrainz.org/ws/2/'
    }
};

// Sistema dinámico de géneros usando APIs
let dynamicGenreTree = {};

// --- SISTEMA DE INTERNACIONALIZACIÓN (i18n) ---
const translations = {
    en: {
        app_title: "🎵 SonicRoots: Musical Genealogy",
        search_button: "Search",
        search_placeholder: "Enter a band name...",
        search_prompt: "Please enter a band name.",
        loading_info: "🔍 Searching for information...",
        band_not_found: 'Information about "{bandName}" was not found. Try another name.',
        search_error: "Error searching for the band. Please try again.",
        main_genre: "Main Genre:",
        country: "Country:",
        formed_in: "Formed in:",
        type: "Type:",
        band_type_default: "Band",
        similar_bands_title: "🔥 Top {genre}",
        tree_title: "🌳 Genre Genealogy Tree",
        tree_subtitle: "👆 Click on genres to see details and listen to examples",
        zoom_in: "➕ Zoom In",
        zoom_reset: "↺ Reset",
        zoom_out: "➖ Zoom Out",
        legend_main: "Main Genre",
        legend_origin: "Origin Genres",
        modal_loading_info: "Loading information...",
        modal_loading_bio: "Loading biography...",
        modal_loading_audio: "🔍 Searching for audio example...",
        modal_loading_track: "🔍 Searching for a hit song...",
        example: "🎵 Example:",
        by: "by",
        watch_on_youtube: "📺 Watch on YouTube:",
        watch_related_on_youtube: "📺 Watch related videos for:",
        open_on_youtube: "▶️ Open on YouTube",
        bio_unavailable: "Biography not available.",
        description_unavailable: "Description not available for {genre}.",
        search_origins_failed: 'No automatic origins found for "{genreName}" in the databases.',
        read_more: "[Read more]",
        read_less: "[Read less]",
        search_spotify: "🎧 Search on Spotify",
        search_this_band: "Search this band",
        deep_search_title: "Search for origins on the web",
        bio_modal_title: "Click to see biography and listen",
    },
    es: {
        app_title: "🎵 SonicRoots: Genealogía Musical",
        search_button: "Buscar",
        search_placeholder: "Escribe el nombre de una banda...",
        search_prompt: "Por favor, escribe el nombre de una banda.",
        loading_info: "🔍 Buscando información...",
        band_not_found: 'No se encontró información sobre "{bandName}". Intenta con otro nombre.',
        search_error: "Error al buscar la banda. Intenta de nuevo.",
        main_genre: "Género Principal:",
        country: "País:",
        formed_in: "Formada en:",
        type: "Tipo:",
        band_type_default: "Banda",
        similar_bands_title: "🔥 Top {genre}",
        tree_title: "🌳 Árbol Genealógico del Género",
        tree_subtitle: "👆 Haz clic en los géneros para ver detalles y escuchar ejemplos",
        zoom_in: "➕ Acercar",
        zoom_reset: "↺ Reset",
        zoom_out: "➖ Alejar",
        legend_main: "Género Principal",
        legend_origin: "Géneros Origen",
        modal_loading_info: "Cargando información...",
        modal_loading_bio: "Cargando biografía...",
        modal_loading_audio: "🔍 Buscando ejemplo de audio...",
        modal_loading_track: "🔍 Buscando un éxito...",
        example: "🎵 Ejemplo:",
        by: "por",
        watch_on_youtube: "📺 Ver en YouTube:",
        watch_related_on_youtube: "📺 Ver videos relacionados con:",
        open_on_youtube: "▶️ Abrir en YouTube",
        bio_unavailable: "Biografía no disponible.",
        description_unavailable: "Descripción no disponible para {genre}.",
        search_origins_failed: 'No se encontraron orígenes automáticos para "{genreName}" en las bases de datos.',
        read_more: "[Leer más]",
        read_less: "[Leer menos]",
        search_spotify: "🎧 Buscar en Spotify",
        search_this_band: "Buscar esta banda",
        deep_search_title: "Buscar orígenes en la web",
        bio_modal_title: "Click para ver biografía y escuchar",
    },
    fr: {
        app_title: "🎵 SonicRoots: Généalogie Musicale",
        search_button: "Rechercher",
        search_placeholder: "Entrez un nom de groupe...",
        search_prompt: "Veuillez entrer un nom de groupe.",
        loading_info: "🔍 Recherche d'informations...",
        band_not_found: 'Informations sur "{bandName}" non trouvées. Essayez un autre nom.',
        search_error: "Erreur lors de la recherche du groupe. Veuillez réessayer.",
        main_genre: "Genre Principal :",
        country: "Pays :",
        formed_in: "Formé en :",
        type: "Type :",
        band_type_default: "Groupe",
        similar_bands_title: "🔥 Top {genre}",
        tree_title: "🌳 Arbre Généalogique du Genre",
        tree_subtitle: "👆 Cliquez sur les genres pour voir les détails et écouter des exemples",
        zoom_in: "➕ Zoom Avant",
        zoom_reset: "↺ Réinitialiser",
        zoom_out: "➖ Zoom Arrière",
        legend_main: "Genre Principal",
        legend_origin: "Genres d'Origine",
        modal_loading_info: "Chargement des informations...",
        modal_loading_bio: "Chargement de la biographie...",
        modal_loading_audio: "🔍 Recherche d'un exemple audio...",
        modal_loading_track: "🔍 Recherche d'un tube...",
        example: "🎵 Exemple :",
        by: "par",
        watch_on_youtube: "📺 Regarder sur YouTube :",
        watch_related_on_youtube: "📺 Regarder des vidéos liées à :",
        open_on_youtube: "▶️ Ouvrir sur YouTube",
        bio_unavailable: "Biographie non disponible.",
        description_unavailable: "Description non disponible pour {genre}.",
        search_origins_failed: 'Aucune origine automatique trouvée pour "{genreName}" dans les bases de données.',
        read_more: "[Lire la suite]",
        read_less: "[Lire moins]",
        search_spotify: "🎧 Rechercher sur Spotify",
        search_this_band: "Rechercher ce groupe",
        deep_search_title: "Rechercher des origines sur le web",
        bio_modal_title: "Cliquez pour voir la biographie et écouter",
    },
    de: {
        app_title: "🎵 SonicRoots: Musikalische Genealogie",
        search_button: "Suchen",
        search_placeholder: "Bandnamen eingeben...",
        search_prompt: "Bitte geben Sie einen Bandnamen ein.",
        loading_info: "🔍 Suche nach Informationen...",
        band_not_found: 'Informationen über "{bandName}" nicht gefunden. Versuchen Sie einen anderen Namen.',
        search_error: "Fehler bei der Suche nach der Band. Bitte versuchen Sie es erneut.",
        main_genre: "Hauptgenre:",
        country: "Land:",
        formed_in: "Gegründet in:",
        type: "Typ:",
        band_type_default: "Band",
        similar_bands_title: "🔥 Top {genre}",
        tree_title: "🌳 Genre-Stammbaum",
        tree_subtitle: "👆 Klicken Sie auf Genres, um Details zu sehen und Beispiele zu hören",
        zoom_in: "➕ Vergrößern",
        zoom_reset: "↺ Zurücksetzen",
        zoom_out: "➖ Verkleinern",
        legend_main: "Hauptgenre",
        legend_origin: "Ursprungsgenres",
        modal_loading_info: "Lade Informationen...",
        modal_loading_bio: "Lade Biografie...",
        modal_loading_audio: "🔍 Suche nach Audiobeispiel...",
        modal_loading_track: "🔍 Suche nach einem Hit...",
        example: "🎵 Beispiel:",
        by: "von",
        watch_on_youtube: "📺 Auf YouTube ansehen:",
        watch_related_on_youtube: "📺 Ähnliche Videos ansehen für:",
        open_on_youtube: "▶️ Auf YouTube öffnen",
        bio_unavailable: "Biografie nicht verfügbar.",
        description_unavailable: "Beschreibung für {genre} nicht verfügbar.",
        search_origins_failed: 'Keine automatischen Ursprünge für "{genreName}" in den Datenbanken gefunden.',
        read_more: "[Mehr lesen]",
        read_less: "[Weniger lesen]",
        search_spotify: "🎧 Auf Spotify suchen",
        search_this_band: "Diese Band suchen",
        deep_search_title: "Im Web nach Ursprüngen suchen",
        bio_modal_title: "Klicken für Biografie und Hörprobe",
    },
    it: {
        app_title: "🎵 SonicRoots: Genealogia Musicale",
        search_button: "Cerca",
        search_placeholder: "Inserisci il nome di una band...",
        search_prompt: "Per favore inserisci il nome di una band.",
        loading_info: "🔍 Ricerca informazioni...",
        band_not_found: 'Informazioni su "{bandName}" non trovate. Prova un altro nome.',
        search_error: "Errore durante la ricerca della band. Riprova.",
        main_genre: "Genere Principale:",
        country: "Paese:",
        formed_in: "Formata nel:",
        type: "Tipo:",
        band_type_default: "Band",
        similar_bands_title: "🔥 Top {genre}",
        tree_title: "🌳 Albero Genealogico del Genere",
        tree_subtitle: "👆 Clicca sui generi per vedere i dettagli e ascoltare esempi",
        zoom_in: "➕ Zoom Avanti",
        zoom_reset: "↺ Reset",
        zoom_out: "➖ Zoom Indietro",
        legend_main: "Genere Principale",
        legend_origin: "Generi di Origine",
        modal_loading_info: "Caricamento informazioni...",
        modal_loading_bio: "Caricamento biografia...",
        modal_loading_audio: "🔍 Ricerca esempio audio...",
        modal_loading_track: "🔍 Ricerca di una hit...",
        example: "🎵 Esempio:",
        by: "di",
        watch_on_youtube: "📺 Guarda su YouTube:",
        watch_related_on_youtube: "📺 Guarda video correlati per:",
        open_on_youtube: "▶️ Apri su YouTube",
        bio_unavailable: "Biografia non disponibile.",
        description_unavailable: "Descrizione non disponibile per {genre}.",
        search_origins_failed: 'Nessuna origine automatica trovata per "{genreName}" nei database.',
        read_more: "[Leggi di più]",
        read_less: "[Leggi di meno]",
        search_spotify: "🎧 Cerca su Spotify",
        search_this_band: "Cerca questa band",
        deep_search_title: "Cerca origini sul web",
        bio_modal_title: "Clicca per vedere biografia e ascoltare",
    },
    pt: {
        app_title: "🎵 SonicRoots: Genealogia Musical",
        search_button: "Buscar",
        search_placeholder: "Digite o nome de uma banda...",
        search_prompt: "Por favor, digite o nome de uma banda.",
        loading_info: "🔍 Buscando informações...",
        band_not_found: 'Informações sobre "{bandName}" não encontradas. Tente outro nome.',
        search_error: "Erro ao buscar a banda. Tente novamente.",
        main_genre: "Gênero Principal:",
        country: "País:",
        formed_in: "Formada em:",
        type: "Tipo:",
        band_type_default: "Banda",
        similar_bands_title: "🔥 Top {genre}",
        tree_title: "🌳 Árvore Genealógica do Gênero",
        tree_subtitle: "👆 Clique nos gêneros para ver detalhes e ouvir exemplos",
        zoom_in: "➕ Mais Zoom",
        zoom_reset: "↺ Resetar",
        zoom_out: "➖ Menos Zoom",
        legend_main: "Gênero Principal",
        legend_origin: "Gêneros de Origem",
        modal_loading_info: "Carregando informações...",
        modal_loading_bio: "Carregando biografia...",
        modal_loading_audio: "🔍 Buscando exemplo de áudio...",
        modal_loading_track: "🔍 Buscando um sucesso...",
        example: "🎵 Exemplo:",
        by: "por",
        watch_on_youtube: "📺 Assistir no YouTube:",
        watch_related_on_youtube: "📺 Assistir vídeos relacionados a:",
        open_on_youtube: "▶️ Abrir no YouTube",
        bio_unavailable: "Biografia indisponível.",
        description_unavailable: "Descrição indisponível para {genre}.",
        search_origins_failed: 'Nenhuma origem automática encontrada para "{genreName}" nos bancos de dados.',
        read_more: "[Ler mais]",
        read_less: "[Ler menos]",
        search_spotify: "🎧 Buscar no Spotify",
        search_this_band: "Buscar esta banda",
        deep_search_title: "Buscar origens na web",
        bio_modal_title: "Clique para ver biografia e ouvir",
    },
    ja: {
        app_title: "🎵 SonicRoots: 音楽の系譜",
        search_button: "検索",
        search_placeholder: "バンド名を入力...",
        search_prompt: "バンド名を入力してください。",
        loading_info: "🔍 情報を検索中...",
        band_not_found: '"{bandName}" に関する情報は見つかりませんでした。別の名前を試してください。',
        search_error: "バンドの検索中にエラーが発生しました。もう一度お試しください。",
        main_genre: "メインジャンル:",
        country: "国:",
        formed_in: "結成:",
        type: "タイプ:",
        band_type_default: "バンド",
        similar_bands_title: "🔥 トップ {genre}",
        tree_title: "🌳 ジャンル系譜図",
        tree_subtitle: "👆 ジャンルをクリックして詳細とサンプルを確認",
        zoom_in: "➕ 拡大",
        zoom_reset: "↺ リセット",
        zoom_out: "➖ 縮小",
        legend_main: "メインジャンル",
        legend_origin: "起源ジャンル",
        modal_loading_info: "情報を読み込んでいます...",
        modal_loading_bio: "伝記を読み込んでいます...",
        modal_loading_audio: "🔍 音声サンプルを検索中...",
        modal_loading_track: "🔍 ヒット曲を検索中...",
        example: "🎵 例:",
        by: "by",
        watch_on_youtube: "📺 YouTubeで見る:",
        watch_related_on_youtube: "📺 関連動画を見る:",
        open_on_youtube: "▶️ YouTubeで開く",
        bio_unavailable: "伝記は利用できません。",
        description_unavailable: "{genre} の説明は利用できません。",
        search_origins_failed: 'データベースで "{genreName}" の自動起源が見つかりませんでした。',
        read_more: "[続きを読む]",
        read_less: "[閉じる]",
        search_spotify: "🎧 Spotifyで検索",
        search_this_band: "このバンドを検索",
        deep_search_title: "ウェブで起源を検索",
        bio_modal_title: "クリックして伝記と試聴を見る",
    }
};

let currentLanguage = localStorage.getItem('musicTreeLang') || 'es';

function t(key, placeholders = {}) {
    let text = (translations[currentLanguage] && translations[currentLanguage][key])
        || translations['en'][key]
        || key;
    for (const placeholder in placeholders) {
        text = text.replace(`{${placeholder}}`, placeholders[placeholder]);
    }
    return text;
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('musicTreeLang', lang);

    // FIX: Limpiar caché de descripciones para forzar recarga en el nuevo idioma
    dynamicGenreTree = {};

    updateStaticUI();
    // Si hay una búsqueda activa, la re-ejecuta para traducir todo
    const currentSearch = document.getElementById('bandInput').value;
    if (currentSearch && document.getElementById('results').innerHTML.trim() !== '') {
        searchBand();
    }
}

function updateStaticUI() {
    document.querySelector('h1').innerHTML = t('app_title');
    document.getElementById('bandInput').placeholder = t('search_placeholder');
    document.querySelector('.search-section button').textContent = t('search_button');
    document.title = t('app_title').replace('🎵 ', ''); // Actualizar título del navegador sin el emoji
}

// --- BASE DE DATOS LOCAL (Simulación de Persistencia) ---
class GenreRepository {
    constructor() {
        this.dbName = 'music_genealogy_db_v6';
        this.data = this.load();

        // Datos semilla (Seed) si la base de datos está vacía
        if (Object.keys(this.data).length === 0) {
            this.seed();
        }
    }

    load() {
        const stored = localStorage.getItem(this.dbName);
        return stored ? JSON.parse(stored) : {};
    }

    save() {
        localStorage.setItem(this.dbName, JSON.stringify(this.data));
    }

    get(genreName) {
        // Auto-reparación: Si la DB está vacía, intentar cargar datos semilla nuevamente
        // Esto corrige problemas de orden de carga de scripts o caché vacío
        if (Object.keys(this.data).length === 0) {
            console.log('🔄 DB vacía detectada. Re-inicializando con datos semilla...');
            this.seed();
        }
        // Normalizar la clave antes de buscar
        const key = normalizeGenreName(genreName);
        return this.data[key] || null;
    }

    add(genreName, origins) {
        const key = normalizeGenreName(genreName);
        const cleanOrigins = origins.map(normalizeGenreName);
        if (!this.data[key]) {
            console.log(`💾 DB Insert: Guardando ${key} en base de datos local.`);
            this.data[key] = cleanOrigins;
            this.save();
        }
    }

    seed() {
        const initialData = {
            // --- 1. RAÍCES PRIMORDIALES ---
            "Blues": ["African Spirituals", "Field Hollers"],
            "Country": ["Folk", "Blues", "Appalachian Music"],
            "Folk": ["Traditional Music"],
            "Classical": ["Early Music", "Baroque"],
            "Jazz": ["Blues", "Ragtime", "Marching Band Music"],
            "Rhythm and Blues": ["Blues", "Gospel", "Jazz"],
            "Gospel": ["Spirituals", "Choral Music"],

            // --- 2. LA RAMA DEL ROCK & PUNK ---
            "Rock and Roll": ["Blues", "Country", "Rhythm and Blues"],
            "Rock": ["Rock and Roll", "Blues"],
            "Hard Rock": ["Blues Rock", "Rock and Roll"],
            "Blues Rock": ["Blues", "Rock and Roll"],
            "Classic Rock": ["Rock", "Hard Rock", "Blues Rock", "Psychedelic Rock"],
            "Folk Rock": ["Folk", "Rock"],
            "Soft Rock": ["Rock", "Pop"],
            "Psychedelic Rock": ["Folk Rock", "Blues Rock", "Jazz"],
            "Garage Rock": ["Rock and Roll", "Surf Rock"],
            "Surf Rock": ["Rock and Roll", "Doo-Wop"],
            "Progressive Rock": ["Rock", "Classical", "Jazz Fusion"],
            "Art Rock": ["Progressive Rock", "Experimental Rock"],
            "Krautrock": ["Experimental Rock", "Electronic", "Psychedelic Rock"],
            "Punk Rock": ["Garage Rock", "Hard Rock", "Protopunk"],
            "Protopunk": ["Garage Rock", "Modernist Music"],
            "Hardcore Punk": ["Punk Rock"],
            "Post-Punk": ["Punk Rock", "Art Rock"],
            "Gothic Rock": ["Post-Punk", "Punk Rock"],
            "Alternative Rock": ["Post-Punk", "Punk Rock", "College Rock"],
            "College Rock": ["New Wave", "Post-Punk"],
            "Grunge": ["Alternative Rock", "Hardcore Punk", "Heavy Metal"],
            "Shoegaze": ["Alternative Rock", "Dream Pop", "Post-Punk"],
            "Dream Pop": ["Post-Punk", "Cocteau Twins Style"],
            "Indie Rock": ["Alternative Rock", "Post-Punk"],
            "Britpop": ["Indie Rock", "Mod Revival", "Psychedelic Rock"],
            "Post-Rock": ["Progressive Rock", "Ambient", "Jazz Rock"],
            "Noise Rock": ["Punk Rock", "No Wave"],
            "No Wave": ["Post-Punk", "Avant-garde"],
            "Emo": ["Hardcore Punk", "Post-Hardcore"],
            "Post-Hardcore": ["Hardcore Punk", "Post-Punk"],
            "Screamo": ["Emo", "Hardcore Punk"],
            "Math Rock": ["Indie Rock", "Progressive Rock", "Post-Hardcore"],
            "Pop Punk": ["Punk Rock", "Power Pop"],
            "Power Pop": ["Rock and Roll", "British Invasion"],

            // --- 3. EL ÁRBOL DEL METAL (EXTREMO Y EVOLUTIVO) ---
            "Heavy Metal": ["Hard Rock", "Blues Rock"],
            "NWOBHM": ["Heavy Metal", "Hard Rock"],
            "Thrash Metal": ["Heavy Metal", "Hardcore Punk"],
            "Speed Metal": ["Heavy Metal", "NWOBHM"],
            "Death Metal": ["Thrash Metal", "First Wave Black Metal"],
            "Technical Death Metal": ["Death Metal", "Progressive Metal"],
            "Melodic Death Metal": ["Death Metal", "NWOBHM"],
            "Brutal Death Metal": ["Death Metal", "Grindcore"],
            "Black Metal": ["Thrash Metal", "Death Metal"],
            "Atmospheric Black Metal": ["Black Metal", "Ambient"],
            "Symphonic Black Metal": ["Black Metal", "Classical"],
            "Doom Metal": ["Heavy Metal", "Psychedelic Rock"],
            "Epic Doom": ["Doom Metal", "Heavy Metal"],
            "Funeral Doom": ["Doom Metal", "Death Metal"],
            "Stoner Metal": ["Doom Metal", "Psychedelic Rock"],
            "Sludge Metal": ["Doom Metal", "Hardcore Punk"],
            "Power Metal": ["Speed Metal", "Heavy Metal"],
            "Symphonic Metal": ["Power Metal", "Classical", "Gothic Metal"],
            "Gothic Metal": ["Doom Metal", "Gothic Rock"],
            "Progressive Metal": ["Progressive Rock", "Heavy Metal", "Thrash Metal"],
            "Alternative Metal": ["Alternative Rock", "Heavy Metal"],
            "Nu Metal": ["Alternative Metal", "Hip Hop", "Industrial Rock"],
            "Industrial Metal": ["Industrial Rock", "Heavy Metal"],
            "Metalcore": ["Hardcore Punk", "Extreme Metal"],
            "Deathcore": ["Death Metal", "Metalcore"],
            "Mathcore": ["Metalcore", "Math Rock"],
            "Grindcore": ["Hardcore Punk", "Death Metal"],
            "Folk Metal": ["Heavy Metal", "Folk"],
            "Kawaii Metal": ["J-Pop", "Power Metal"],

            // --- 4. ELECTRÓNICA Y DANCE ---
            "Electronic": ["Experimental Music", "Musique Concrète"],
            "Synth-pop": ["New Wave", "Electronic"],
            "Industrial": ["Experimental Music", "Punk Rock"],
            "Electro": ["Funk", "Electronic", "Hip Hop"],
            "House": ["Disco", "Electronic", "Funk"],
            "Chicago House": ["House"],
            "Deep House": ["House", "Jazz Fusion", "Soul"],
            "Acid House": ["House", "Synth-pop"],
            "Techno": ["Electronic", "House", "Industrial"],
            "Detroit Techno": ["Techno", "Funk"],
            "Minimal Techno": ["Techno", "Detroit Techno"],
            "Trance": ["Techno", "Synth-pop", "House"],
            "Psytrance": ["Trance", "Acid House"],
            "Eurodance": ["House", "Synth-pop", "Hi-NRG"],
            "Ambient": ["Classical", "Electronic", "Psychedelic Rock"],
            "IDM": ["Techno", "Ambient", "Breakbeat"],
            "Drum and Bass": ["Jungle", "Breakbeat Hardcore"],
            "Jungle": ["Breakbeat", "Reggae", "Dancehall"],
            "Dubstep": ["UK Garage", "Dub", "Drum and Bass"],
            "UK Garage": ["House", "R&B"],
            "Trip Hop": ["Hip Hop", "Acid Jazz", "Ambient"],
            "Synthwave": ["Synth-pop", "Electronic", "Italo Disco"],
            "Vaporwave": ["Smooth Jazz", "Synth-pop", "Elevator Music"],
            "Hyperpop": ["Bubblegum Pop", "Electro-pop", "Trance"],

            // --- 5. HIP HOP Y URBANO ---
            "Hip Hop": ["Funk", "Disco", "Rhythm and Blues"],
            "Old School Hip Hop": ["Funk", "Disco"],
            "Boom Bap": ["Old School Hip Hop", "Jazz Rap"],
            "Jazz Rap": ["Hip Hop", "Jazz"],
            "Gangsta Rap": ["Hip Hop"],
            "G-Funk": ["Gangsta Rap", "P-Funk"],
            "Trap": ["Hip Hop", "Southern Hip Hop"],
            "Drill": ["Trap"],
            "UK Drill": ["Drill", "Grime"],
            "Grime": ["UK Garage", "Hip Hop", "Jungle"],
            "Reggaeton": ["Dancehall", "Hip Hop", "Latin Pop"],
            "Dancehall": ["Reggae"],
            "Phonk": ["Memphis Rap", "Trap"],

            // --- 6. JAZZ, SOUL Y FUNK ---
            "Swing": ["Jazz"],
            "Bebop": ["Jazz", "Swing"],
            "Cool Jazz": ["Bebop", "Classical"],
            "Hard Bop": ["Bebop", "Blues", "Gospel"],
            "Jazz Fusion": ["Jazz", "Rock", "Funk"],
            "Soul": ["Rhythm and Blues", "Gospel"],
            "Funk": ["Soul", "Rhythm and Blues", "Jazz"],
            "P-Funk": ["Funk", "Psychedelic Rock"],
            "Disco": ["Funk", "Soul", "Salsoul"],
            "Neo Soul": ["Soul", "Contemporary R&B", "Hip Hop"],
            "Contemporary R&B": ["Soul", "Hip Hop", "Pop"],

            // --- 7. LATINA Y MUNDO ---
            "Salsa": ["Son Cubano", "Mambo", "Jazz"],
            "Son Cubano": ["Afro-Cuban Music", "Canción Española"],
            "Mambo": ["Son Cubano", "Swing"],
            "Tango": ["Milonga", "Habanera", "European Classical"],
            "Bossa Nova": ["Samba", "Jazz"],
            "Samba": ["Afro-Brazilian Music"],
            "Reggae": ["Rocksteady", "Ska"],
            "Ska": ["Rhythm and Blues", "Jazz", "Mento"],
            "Rocksteady": ["Ska", "Soul"],
            "Bolero": ["Trova", "Spanish Classical"],
            "Cumbia": ["Afro-Colombian Music", "Indigenous Flute Music"],
            "Bachata": ["Bolero", "Son Cubano"],

            // --- 8. POP Y OTROS ---
            "Pop": ["Rock and Roll", "Folk", "Swing"],
            "K-Pop": ["Hip Hop", "R&B", "Electronic", "J-Pop"],
            "J-Pop": ["Pop", "Kayōkyoku"],
            "Baroque Pop": ["Pop", "Classical", "Rock"],
            "Bubblegum Pop": ["Pop", "New Wave"]
        };

        // Normalizar datos semilla antes de guardar para asegurar consistencia
        this.data = {};
        for (const [key, origins] of Object.entries(initialData)) {
            const normalizedKey = normalizeGenreName(key);
            const normalizedOrigins = origins.map(normalizeGenreName);
            this.data[normalizedKey] = normalizedOrigins;
        }

        this.save();
        console.log('🌱 Base de datos inicializada con datos semilla.');
    }
}

// Instancia global de la base de datos
const genreDB = new GenreRepository();

async function getGenreInfo(genreName) {
    const normalizedName = normalizeGenreName(genreName);
    if (dynamicGenreTree[normalizedName]) {
        return dynamicGenreTree[normalizedName];
    }

    try {
        const response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=${encodeURIComponent(normalizedName)}&api_key=48391754056a418bde4671e969d9eea1&format=json&lang=${currentLanguage}`
        );

        if (response.ok) {
            const data = await response.json();

            if (data.tag) {
                // Intentar obtener orígenes: primero de la base local, luego dinámicamente
                console.log(`📄 Info Last.fm recibida para ${normalizedName}`);

                // 1. Consultar Base de Datos
                let origins = genreDB.get(normalizedName);

                if (!origins) {
                    // 2. Si no existe, buscar en API externa (Wikidata)
                    origins = await fetchDynamicOrigins(normalizedName);
                    // 3. INSERT en tiempo real en la Base de Datos
                    if (origins && origins.length > 0) {
                        genreDB.add(normalizedName, origins);
                    }
                }

                // Procesar descripción de Last.fm
                let description = data.tag.wiki?.summary;
                if (description) {
                    // Limpiar enlace "Read more on Last.fm"
                    description = description.replace(/\s*<a href="[^"]*last\.fm[^"]*"[^>]*>.*?<\/a>\s*/i, '');
                    // Quitar etiquetas HTML
                    description = description.replace(/<[^>]+>/g, '');
                    // Decodificar entidades básicas
                    description = description.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                    description = description.trim();
                }

                // Fallback Inteligente: Si la descripción es pobre (ej. "."), buscar en Wikipedia
                if (!description || description.length < 50 || description === '.' || description === 'null') {
                    console.log(`⚠️ Descripción insuficiente de Last.fm para ${normalizedName}: "${description}". Intentando Wikipedia...`);
                    const wikiDesc = await getWikipediaDescription(normalizedName);
                    if (wikiDesc) {
                        description = wikiDesc;
                    } else if (description === '.') {
                        // Si falla Wikipedia y solo tenemos un punto, forzamos el mensaje de error
                        description = null;
                    }
                }

                if (!description) description = t('description_unavailable', { genre: normalizedName });

                const genreInfo = {
                    description: description,
                    origins: origins || []
                };

                dynamicGenreTree[normalizedName] = genreInfo;
                return genreInfo;
            }
        }
    } catch (error) {
        console.error(`Error obteniendo info de ${genreName}:`, error);
    }

    // Fallback: Intentar buscar orígenes dinámicos incluso si falla Last.fm
    let origins = genreDB.get(normalizedName);
    if (!origins) {
        origins = await fetchDynamicOrigins(normalizedName);
        if (origins && origins.length > 0) genreDB.add(normalizedName, origins);
    }

    // Fallback de descripción: Si Last.fm falló, intentar Wikipedia
    let fallbackDesc = t('description_unavailable', { genre: normalizedName });
    const wikiDesc = await getWikipediaDescription(normalizedName);
    if (wikiDesc) fallbackDesc = wikiDesc;

    const fallbackInfo = {
        description: fallbackDesc,
        origins: origins || []
    };

    dynamicGenreTree[normalizedName] = fallbackInfo;
    return fallbackInfo;
}

async function searchBand() {
    const bandName = document.getElementById('bandInput').value.trim();
    const resultsDiv = document.getElementById('results');

    // Detener cualquier audio que se esté reproduciendo en el modal antes de buscar
    const modalAudio = document.querySelector('#genre-modal audio');
    if (modalAudio) {
        modalAudio.pause();
        modalAudio.currentTime = 0;
    }

    // Ocultar sugerencias al iniciar búsqueda
    const suggestionsBox = document.querySelector('.suggestions-box');
    if (suggestionsBox) {
        suggestionsBox.style.display = 'none';
    }

    if (!bandName) {
        resultsDiv.innerHTML = `<p>${t('search_prompt')}</p>`;
        return;
    }

    resultsDiv.innerHTML = `<p>${t('loading_info')}</p>`;

    try {
        const bandInfo = await getBandInfo(bandName);
        if (bandInfo) {
            await displayResults(bandName, bandInfo);
        } else {
            resultsDiv.innerHTML = `<p>${t('band_not_found', { bandName: bandName })}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = '<p>Error al buscar la banda. Intenta de nuevo.</p>';
    }
}

async function getBandInfo(bandName) {
    try {
        const mbResponse = await fetch(
            `https://musicbrainz.org/ws/2/artist/?query=artist:"${encodeURIComponent(bandName)}"&fmt=json&limit=1`, {
            headers: {
                // MusicBrainz API requiere un User-Agent para devolver datos completos.
                'User-Agent': 'MusicGenealogyApp/1.0 (https://github.com/your-repo)'
            }
        },
        );

        if (!mbResponse.ok) throw new Error('Error en la búsqueda');

        const mbData = await mbResponse.json();

        if (mbData.artists && mbData.artists.length > 0) {
            const artist = mbData.artists[0];
            const image = await getBandImage(artist.name);

            // NUEVO: Obtener género preciso desde Last.fm (Crowdsourcing)
            // Esto reemplaza la dependencia del mapa hardcoded
            let genre = await getTopGenreFromLastFM(artist.name);

            // Buscar ID de Spotify en las relaciones de MusicBrainz
            let spotifyId = null;
            if (artist.relations) {
                const spotifyRel = artist.relations.find(r => r.type === 'spotify' || (r.url && r.url.resource.includes('spotify.com')));
                if (spotifyRel) {
                    // Extraer ID de la URL (ej: https://open.spotify.com/artist/12345...)
                    const match = spotifyRel.url.resource.match(/artist\/([a-zA-Z0-9]+)/) || spotifyRel.url.resource.match(/spotify:artist:([a-zA-Z0-9]+)/);
                    if (match) spotifyId = match[1];
                }
            }

            // Generar un enlace de búsqueda de Spotify, que es más fiable que buscar una relación directa.
            const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(artist.name)}`;

            return {
                name: artist.name,
                genre: genre || extractGenre(artist.tags || []), // Fallback a MusicBrainz si falla Last.fm
                country: artist.country || 'Desconocido',
                formed: artist['life-span'] ? artist['life-span'].begin?.split('-')[0] : 'Desconocido',
                type: artist.type || 'Banda',
                image: image,
                spotifyUrl: spotifySearchUrl,
                spotifyId: spotifyId
            };
        }

        return null;
    } catch (error) {
        console.error('Error al obtener información:', error);
        return null;
    }
}

// Función para obtener el género más preciso usando la inteligencia colectiva de Last.fm
async function getTopGenreFromLastFM(artistName) {
    try {
        const response = await fetch(
            `${API_CONFIG.lastfm.baseUrl}?method=artist.gettoptags&artist=${encodeURIComponent(artistName)}&api_key=${API_CONFIG.lastfm.key}&format=json&limit=8&lang=${currentLanguage}`
        );

        if (response.ok) {
            const data = await response.json();
            const tags = data.toptags?.tag || [];
            const tagList = Array.isArray(tags) ? tags : [tags];

            // Normalizar nombre de la banda para comparación (minúsculas y sin acentos)
            const normalizedArtist = artistName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            // Lista negra de etiquetas que NO son géneros musicales
            const ignoreList = [
                'seen live', 'under 2000 listeners', 'female vocalists', 'male vocalists',
                'american', 'british', 'canadian', 'german', 'french', 'australian', 'swedish',
                '80s', '90s', '00s', '70s', '60s', 'all', 'favorite', 'favourite', 'favorites',
                'singer-songwriter', 'solo', 'band', 'group', 'rock', 'metal' // Preferimos subgéneros específicos si existen
            ];

            // Buscar la primera etiqueta válida
            for (const tag of tagList) {
                let name = tag.name.toLowerCase();

                // Normalización extra para coincidir con DB (ej. "Rock & Roll" -> "rock and roll")
                name = name.replace(/\s*&\s*/g, ' and ');

                // Verificar si el tag es igual al nombre de la banda (ignorando acentos y case)
                const normalizedTag = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (normalizedTag === normalizedArtist) continue;

                // Si es "rock" o "metal", lo guardamos como backup pero seguimos buscando algo más específico
                if (name === 'rock' || name === 'metal') continue;

                if (!ignoreList.includes(name) && name.length > 2) {
                    return normalizeGenreName(name);
                }
            }

            // Si solo encontramos etiquetas genéricas como "Rock", usamos esa
            if (tagList.length > 0 && tagList[0].name) {
                return normalizeGenreName(tagList[0].name);
            }
        }
    } catch (e) {
        console.warn('Error obteniendo tags de Last.fm:', e);
    }
    return null;
}

async function getBandImage(artistName) {
    try {
        let response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=48391754056a418bde4671e969d9eea1&format=json`
        );

        if (response.ok) {
            const data = await response.json();
            const validImage = extractValidImage(data.artist?.image);
            if (validImage) {
                return validImage;
            }
        }

        response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${encodeURIComponent(artistName)}&api_key=48391754056a418bde4671e969d9eea1&format=json&limit=5`
        );

        if (response.ok) {
            const albumData = await response.json();

            if (albumData.topalbums?.album) {
                const albums = Array.isArray(albumData.topalbums.album) ? albumData.topalbums.album : [albumData.topalbums.album];

                for (const album of albums) {
                    const validImage = extractValidImage(album.image);
                    if (validImage) {
                        return validImage;
                    }
                }
            }
        }

        return createCustomPlaceholder(artistName);

    } catch (error) {
        console.error('Error al obtener imagen de Last.fm:', error);
        return createCustomPlaceholder(artistName);
    }
}

function extractValidImage(images) {
    if (!images || !Array.isArray(images)) return null;

    for (const img of images.reverse()) {
        if (img['#text'] && img['#text'].trim() !== '') {
            const imageUrl = img['#text'];

            if (!imageUrl.includes('2a96cbd8b46e442fc41c2b86b821562f') &&
                !imageUrl.includes('c6f59c1e5e7240a4c0d427abd71f3dbb') &&
                !imageUrl.includes('4128a6eb29f94943c9d206c08e625904')) {
                return imageUrl;
            }
        }
    }

    return null;
}

function createCustomPlaceholder(artistName) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 120;
    canvas.height = 120;

    const colors = [
        ['#ff0055', '#ff00aa'], ['#00f3ff', '#0099ff'], ['#b026ff', '#7a00ff'],
        ['#ffff00', '#ffaa00'], ['#00ff99', '#00cc66'], ['#ff2a6d', '#d30035']
    ];

    const hash = artistName.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);

    const colorPair = colors[Math.abs(hash) % colors.length];
    const initial = artistName.charAt(0).toUpperCase();

    const gradient = ctx.createLinearGradient(0, 0, 120, 120);
    gradient.addColorStop(0, colorPair[0]);
    gradient.addColorStop(1, colorPair[1]);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 120, 120);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initial, 60, 60);

    return canvas.toDataURL('image/png');
}

function extractGenre(tags) {
    if (!tags || tags.length === 0) return 'Rock';

    const genreMap = {
        'metal': 'Heavy Metal', 'heavy metal': 'Heavy Metal', 'death metal': 'Death Metal',
        'black metal': 'Black Metal', 'gothic metal': 'Gothic Metal', 'symphonic metal': 'Symphonic Metal',
        'power metal': 'Power Metal', 'thrash metal': 'Thrash Metal', 'progressive metal': 'Progressive Metal',
        'gothic rock': 'Gothic Rock', 'punk': 'Punk Rock', 'punk rock': 'Punk Rock',
        'alternative rock': 'Alternative Rock', 'grunge': 'Grunge', 'hard rock': 'Hard Rock',
        'progressive rock': 'Progressive Rock', 'post-punk': 'Post-Punk'
    };

    for (const tag of tags) {
        const tagName = tag.name.toLowerCase();
        if (genreMap[tagName]) {
            return genreMap[tagName];
        }
    }

    for (const tag of tags) {
        const tagName = tag.name.toLowerCase();
        if (tagName.includes('metal')) return 'Heavy Metal';
        if (tagName.includes('rock')) return 'Hard Rock';
        if (tagName.includes('punk')) return 'Punk Rock';
    }

    return 'Rock';
}

async function getTopArtistsForGenre(genreName, currentArtistName) {
    try {
        const response = await fetch(
            `${API_CONFIG.lastfm.baseUrl}?method=tag.gettopartists&tag=${encodeURIComponent(genreName)}&api_key=${API_CONFIG.lastfm.key}&format=json&limit=10`
        );

        if (response.ok) {
            const data = await response.json();
            const artists = data.topartists?.artist || [];

            // Filtrar la banda actual y tomar el Top 3
            const filtered = artists.filter(a =>
                a.name.toLowerCase() !== currentArtistName.toLowerCase()
            ).slice(0, 3);

            // Mejorar con imágenes usando la función existente
            const enhancedArtists = await Promise.all(filtered.map(async artist => {
                const image = await getBandImage(artist.name);
                return {
                    name: artist.name,
                    image: image || 'https://via.placeholder.com/40'
                };
            }));

            return enhancedArtists;
        }
    } catch (e) {
        console.warn('Error fetching top artists:', e);
    }
    return [];
}

async function displayResults(bandName, bandInfo) {
    const resultsDiv = document.getElementById('results');
    const genre = bandInfo.genre;

    // Obtener bandas similares (Top del género)
    const similarBands = await getTopArtistsForGenre(genre, bandInfo.name);

    let similarHtml = '';
    if (similarBands.length > 0) {
        similarHtml = `
            <div class="similar-bands">
                <h3>${t('similar_bands_title', { genre: genre })}</h3>
                <div class="similar-list">
                    ${similarBands.map(band => `
                        <div class="similar-item" onclick="document.getElementById('bandInput').value = '${band.name.replace(/'/g, "\\'")}'; searchBand();">
                            <img src="${band.image}" class="similar-img">
                            <span>${band.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    let html = `
        <style>
            .band-image-container { position: relative; }
            
            /* Tooltip Personalizado (Caja) */
            .band-image-container::after {
                content: attr(data-tooltip);
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                margin-bottom: 10px;
                background: rgba(0, 0, 0, 0.9);
                color: #00f3ff;
                padding: 6px 12px;
                border-radius: 6px;
                font-size: 0.85em;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
                z-index: 100;
                border: 1px solid rgba(0, 243, 255, 0.3);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            }

            /* Estados de activación (Hover y Auto-Animación) */
            .band-image-container:hover::after,
            .band-image-container.auto-hint::after {
                opacity: 1;
                visibility: visible;
                transform: translateX(-50%) translateY(-5px);
            }

            .band-image-container.auto-hint .image-overlay {
                opacity: 1 !important;
                visibility: visible !important;
            }
        </style>
        <div class="info-container">
            <div class="band-info">
                <div class="band-image-container" 
                     data-tooltip="${t('bio_modal_title')}"
                     onclick="showBandModal('${bandInfo.name.replace(/'/g, "\\'")}')">
                    <img src="${bandInfo.image}" alt="${bandInfo.name}" class="band-image" 
                         onerror="this.src='${createCustomPlaceholder(bandInfo.name)}'">
                    <div class="image-overlay">
                        <span>📖</span>
                    </div>
                </div>
                <div class="band-details">
                    <h2>🎸 ${bandInfo.name || capitalizeWords(bandName)}</h2>
                    <p><strong>${t('main_genre')}</strong> ${genre}</p>
                    <p><strong>${t('country')}</strong> ${bandInfo.country}</p>
                    <p><strong>${t('formed_in')}</strong> ${bandInfo.formed}</p>
                    <p><strong>${t('type')}</strong> ${bandInfo.type || t('band_type_default')}</p>
                    ${bandInfo.spotifyId
            ? `<iframe style="border-radius:12px; margin-top:15px;" src="https://open.spotify.com/embed/artist/${bandInfo.spotifyId}?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
            : (bandInfo.spotifyUrl
                ? `<div style="display: flex; flex-direction: column; align-items: center;">
                     <a href="spotify:search:${encodeURIComponent(bandInfo.name)}" class="spotify-link">${t('search_spotify')} (App)</a>
                     <a href="${bandInfo.spotifyUrl}" target="_blank" style="font-size: 0.85em; margin-top: 8px; color: #00f3ff; text-decoration: none; opacity: 0.8; transition: opacity 0.2s;">🌐 Abrir en Web</a>
                   </div>`
                : '')
        }
                </div>
            </div>
            ${similarHtml}
        </div>
        
        <div class="genre-tree">
            <h3>${t('tree_title')}</h3>
            <p style="text-align: center; color: #aaa; margin-bottom: 15px; font-size: 0.9em;">${t('tree_subtitle')}</p>
            
            <!-- Controles de Zoom -->
            <div class="zoom-controls">
                <button class="zoom-btn" onclick="zoomTree(0.2)">${t('zoom_in')}</button>
                <button class="zoom-btn" onclick="resetTreeZoom()">${t('zoom_reset')}</button>
                <button class="zoom-btn" onclick="zoomTree(-0.2)">${t('zoom_out')}</button>
            </div>

            <div class="tree-container">
                <div id="mermaid-container" style="display:flex; justify-content:center; min-height:300px; width:100%;">
                    <p>Generando árbol genealógico...</p>
                </div>
            </div>
            <div class="tree-legend">
                <div class="legend-item">
                    <span class="legend-color legend-main"></span>
                    ${t('legend_main')}
                </div>
                <div class="legend-item">
                    <span class="legend-color legend-origin"></span>
                    ${t('legend_origin')}
                </div>
            </div>
        </div>
    `;

    resultsDiv.innerHTML = html;

    // Animación automática para sugerir que la imagen es clickeable (Auto-Hover)
    const imgContainer = resultsDiv.querySelector('.band-image-container');
    if (imgContainer) {
        setTimeout(() => {
            imgContainer.classList.add('auto-hint');
            setTimeout(() => {
                imgContainer.classList.remove('auto-hint');
            }, 3000);
        }, 500);
    }

    // Agregar listener para zoom con rueda del mouse
    const treeContainer = resultsDiv.querySelector('.tree-container');
    if (treeContainer) {
        // Zoom con rueda
        treeContainer.addEventListener('wheel', (e) => {
            e.preventDefault();

            const rect = treeContainer.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            const oldZoom = treeZoomLevel;
            const delta = e.deltaY < 0 ? 0.1 : -0.1;
            const newZoom = Math.max(0.2, Math.min(5, oldZoom + delta));

            if (newZoom !== oldZoom) {
                treeZoomLevel = newZoom;
                applyTreeZoom();

                // Ajustar scroll para hacer zoom hacia la posición del mouse
                const scaleRatio = newZoom / oldZoom;
                treeContainer.scrollLeft = (treeContainer.scrollLeft + offsetX) * scaleRatio - offsetX;
                treeContainer.scrollTop = (treeContainer.scrollTop + offsetY) * scaleRatio - offsetY;
            }
        });

        // Drag & Drop (Pan) para desplazarse
        let isDown = false;
        let startX, startY, scrollLeft, scrollTop;

        treeContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            treeContainer.style.cursor = 'grabbing';
            startX = e.pageX;
            startY = e.pageY;
            scrollLeft = treeContainer.scrollLeft;
            scrollTop = treeContainer.scrollTop;
        });

        treeContainer.addEventListener('mouseleave', () => {
            isDown = false;
            treeContainer.style.cursor = 'grab';
        });

        treeContainer.addEventListener('mouseup', () => {
            isDown = false;
            treeContainer.style.cursor = 'grab';
        });

        treeContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX;
            const y = e.pageY;
            const walkX = (x - startX);
            const walkY = (y - startY);
            treeContainer.scrollLeft = scrollLeft - walkX;
            treeContainer.scrollTop = scrollTop - walkY;
        });
    }

    await buildVisualTree(genre);
}

// Mapa para relacionar IDs de Mermaid con nombres reales de géneros
window.mermaidIdMap = {};

// Estado global del gráfico para expansión dinámica
let currentGraphNodes = new Set();
let currentGraphEdges = new Set();
let currentMainGenre = null;
let treeZoomLevel = 1;

// Cargar Mermaid.js dinámicamente
async function loadMermaid() {
    if (window.mermaid) return;

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
        script.onload = () => {
            mermaid.initialize({
                logLevel: 3, // Nivel de log para debug
                startOnLoad: false,
                theme: 'neutral',
                securityLevel: 'loose',
                flowchart: {
                    curve: 'basis', // Líneas curvas estilo orgánico
                    useMaxWidth: true,
                    htmlLabels: true
                }
            });
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Función principal para construir el árbol
async function buildVisualTree(mainGenre) {
    currentMainGenre = mainGenre;
    resetTreeZoom(); // Resetear zoom al cargar nuevo árbol
    // Reiniciar estado del gráfico
    currentGraphNodes = new Set();
    currentGraphEdges = new Set();

    // Cargar niveles iniciales (limitado a 3 niveles para velocidad)
    const levels = await getGenreLevels(mainGenre, 3);

    // Reiniciar mapa de IDs
    window.mermaidIdMap = {};
    const sanitize = (name) => {
        // Crear ID seguro para Mermaid (sin espacios ni caracteres especiales)
        const id = 'node_' + name.replace(/[^a-zA-Z0-9]/g, '_');
        window.mermaidIdMap[id] = name;
        return id;
    };

    // Procesar datos iniciales para llenar el estado del gráfico
    for (let i = 0; i < levels.length; i++) {
        const currentLevel = levels[i];
        for (const genre of currentLevel) {
            currentGraphNodes.add(normalizeGenreName(genre));

            // Conectar con padres si existen en el siguiente nivel
            if (i < levels.length - 1) {
                const genreInfo = await getGenreInfo(genre);
                if (genreInfo && genreInfo.origins) {
                    for (const origin of genreInfo.origins) {
                        const normalizedOrigin = normalizeGenreName(origin);
                        if (levels[i + 1] && levels[i + 1].includes(normalizedOrigin)) {
                            currentGraphEdges.add(`${normalizeGenreName(genre)}|${normalizedOrigin}`); // Formato temporal "Hijo|Padre"
                        }
                    }
                }
            }
        }
    }

    await renderMermaidGraph();
}

// Función separada para renderizar basada en el estado actual (currentGraphNodes/Edges)
async function renderMermaidGraph() {
    const sanitize = (name) => {
        const id = 'node_' + name.replace(/[^a-zA-Z0-9]/g, '_');
        window.mermaidIdMap[id] = name;
        return id;
    };

    // Construir definición del gráfico (TD = Top Down, raíces arriba)
    let graphDefinition = 'graph TD\n';

    // Estilos personalizados
    graphDefinition += 'classDef default fill:#090910,stroke:#00f3ff,stroke-width:2px,rx:5,ry:5,color:#fff,font-family:Arial;\n';
    graphDefinition += 'classDef main fill:#ff0055,stroke:#fff,stroke-width:3px,color:#fff,font-weight:bold;\n';

    // Identificar nodos que ya se han expandido (son origen de una flecha hacia abajo)
    const expandedNodes = new Set();
    const adj = {};
    currentGraphEdges.forEach(edgeString => {
        const [child, parent] = edgeString.split('|');
        expandedNodes.add(child);

        // Construir lista de adyacencia para el algoritmo de coloreado
        if (!adj[child]) adj[child] = [];
        adj[child].push(parent);
    });

    // 1. Agregar Nodos
    currentGraphNodes.forEach(genre => {
        const genreId = sanitize(genre);

        // Solo mostrar lupa si el nodo NO se ha expandido aún (es una hoja en el gráfico actual)
        const isLeaf = !expandedNodes.has(genre);
        const searchIcon = isLeaf ? ` <span class='node-search' title='${t('deep_search_title')}'>🔍</span>` : "";

        const nodeClass = genre === currentMainGenre ? 'main' : 'default';
        graphDefinition += `${genreId}["${genre}${searchIcon}"]:::${nodeClass}\n`;
    });

    // 2. Calcular Colores de Aristas (Lógica de Ramas)
    const edgeColors = new Map();
    const palette = ['#ff0055', '#00f3ff', '#b026ff', '#ffff00', '#00ff99', '#ff2a6d', '#ff00aa', '#0099ff'];
    let colorIndex = 0;
    const getNextColor = () => palette[(colorIndex++) % palette.length];

    // BFS para asignar colores desde el nodo principal
    // Iniciamos con un color base (ej. morado neón)
    const queue = [{ node: currentMainGenre, color: '#b026ff' }];
    const processedNodes = new Set();

    // Asegurar que todas las aristas tengan un color por defecto (gris oscuro) por si hay islas desconectadas
    currentGraphEdges.forEach(e => edgeColors.set(e, '#333'));

    while (queue.length > 0) {
        const { node, color } = queue.shift();
        if (processedNodes.has(node)) continue;
        processedNodes.add(node);

        const parents = adj[node] || [];
        if (parents.length === 0) continue;

        if (parents.length === 1) {
            // Caso 1: Un solo padre -> Heredar color (Continuidad)
            const p = parents[0];
            const edgeKey = `${node}|${p}`;
            edgeColors.set(edgeKey, color);
            queue.push({ node: p, color: color });
        } else {
            // Caso 2: Ramificación -> Generar nuevos colores para cada rama
            parents.forEach(p => {
                const newColor = getNextColor();
                const edgeKey = `${node}|${p}`;
                edgeColors.set(edgeKey, newColor);
                queue.push({ node: p, color: newColor });
            });
        }
    }

    // 3. Agregar Conexiones y Estilos
    let linkIndex = 0;
    const linkStyles = [];

    // Resetear mapa de aristas para efectos visuales
    window.nodeToOutgoingEdgeIndices = {};

    // Convertir Set a Array para mantener orden consistente en la definición de estilos
    Array.from(currentGraphEdges).forEach(edgeString => {
        const [child, parent] = edgeString.split('|');
        const childId = sanitize(child);
        const parentId = sanitize(parent);

        // Guardar índice de arista para efectos hover (Hijo -> Padres)
        if (!window.nodeToOutgoingEdgeIndices[childId]) {
            window.nodeToOutgoingEdgeIndices[childId] = [];
        }
        window.nodeToOutgoingEdgeIndices[childId].push(linkIndex);

        // Asegurar que los nodos de la conexión existan en la definición
        // (Mermaid los crea implícitamente, pero mejor ser explícito arriba)

        // Flecha: Hijo --> Padre (Invertido visualmente por TD: Hijo arriba)
        // Espera, queríamos Principal Arriba -> Orígenes Abajo.
        // Entonces la flecha debe ser Principal --> Origen.
        graphDefinition += `${childId} --> ${parentId}\n`;

        // Asignar estilo específico a este link por índice
        const color = edgeColors.get(edgeString) || '#b026ff';
        linkStyles.push(`linkStyle ${linkIndex} stroke:${color},stroke-width:2px;`);
        linkIndex++;
    });

    // Agregar todos los estilos de links al final
    graphDefinition += linkStyles.join('\n');

    // Marcar el nodo raíz (el primero que se buscó) con estilo 'main' si es posible
    // Para este ejemplo, simplemente renderizamos.

    console.log('📝 Renderizando gráfico actualizado...');

    const container = document.getElementById('mermaid-container');
    if (!container) return;

    try {
        await loadMermaid();
        const id = `mermaid-${Date.now()}`;
        const { svg } = await mermaid.render(id, graphDefinition);
        container.innerHTML = svg;

        // Re-aplicar listeners
        setupMermaidListeners(container);

    } catch (e) {
        console.error('Error renderizando Mermaid:', e);
    }
}

function setupMermaidListeners(container) {
    container.onclick = async (e) => {
        // ... (código existente de click) ...
    };

    // Hover listeners para resaltar conexiones
    const nodes = container.querySelectorAll('.node');
    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const foundId = Object.keys(window.mermaidIdMap).find(key => node.id.includes(key));
            if (foundId && window.nodeToOutgoingEdgeIndices && window.nodeToOutgoingEdgeIndices[foundId]) {
                highlightEdges(window.nodeToOutgoingEdgeIndices[foundId], true);
            }
        });
        node.addEventListener('mouseleave', () => {
            const foundId = Object.keys(window.mermaidIdMap).find(key => node.id.includes(key));
            if (foundId && window.nodeToOutgoingEdgeIndices && window.nodeToOutgoingEdgeIndices[foundId]) {
                highlightEdges(window.nodeToOutgoingEdgeIndices[foundId], false);
            }
        });
    });

    // Mantener lógica original de click (re-declarada arriba para claridad, pero en el código real se fusiona)
    // Para evitar duplicar, solo agregamos el bloque de hover al final de la función existente,
    // pero como estoy reemplazando la función, aquí va completa con la lógica de click original:

    container.onclick = async (e) => {
        // Detectar clic en el icono de búsqueda (Lupa)
        const searchIcon = e.target.closest('.node-search');
        if (searchIcon) {
            e.stopPropagation(); // Evitar que se abra el modal
            const nodeElement = searchIcon.closest('.node');
            if (nodeElement) {
                const foundId = Object.keys(window.mermaidIdMap).find(key => nodeElement.id.includes(key));
                if (foundId) {
                    const genreName = window.mermaidIdMap[foundId];
                    await performDeepAncestorSearch(genreName);
                }
            }
            return;
        }

        const nodeElement = e.target.closest('.node');
        if (nodeElement) {
            const foundId = Object.keys(window.mermaidIdMap).find(key => nodeElement.id.includes(key));
            if (foundId) {
                const genreName = window.mermaidIdMap[foundId];
                console.log('🖱️ Click:', genreName);

                // 1. Mostrar Modal
                initModalSystem();
                showGenreModal(genreName);

                // 2. EXPANSIÓN DINÁMICA: Buscar orígenes y agregarlos al gráfico
                await expandGenreNode(genreName);
            }
        }
    };
}

// Función auxiliar para iluminar aristas
function highlightEdges(indices, enable) {
    const container = document.getElementById('mermaid-container');
    // Selector corregido: buscamos directamente los elementos 'path' dentro del grupo de aristas
    const paths = container.querySelectorAll('.edgePaths path');

    indices.forEach(index => {
        if (paths[index]) {
            if (enable) {
                paths[index].classList.add('edge-glow');
            } else {
                paths[index].classList.remove('edge-glow');
            }
        }
    });
}

// Función para realizar una búsqueda profunda (Wikidata + Wikipedia)
async function performDeepAncestorSearch(genreName) {
    console.log(t('deep_search_start', { genreName: genreName }));

    // Feedback visual simple (podría mejorarse con un toast)
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = 'wait';

    // Generar variantes de búsqueda (Original, Sin guiones, Todo junto)
    const searchVariants = [genreName];
    if (genreName.includes('-')) {
        searchVariants.push(genreName.replace(/-/g, ' ')); // "Lo-fi" -> "Lo fi"
        searchVariants.push(genreName.replace(/-/g, ''));  // "Lo-fi" -> "Lofi"
    }

    let origins = [];

    // Iterar sobre variantes hasta encontrar resultados
    for (const variant of searchVariants) {
        console.log(`🔍 Probando variante: "${variant}"`);

        // 1. Intentar Wikidata
        origins = await fetchDynamicOrigins(variant);
        if (origins && origins.length > 0) break;

        // 2. Intentar Wikipedia
        console.log(t('wiki_infobox_search'));
        origins = await fetchWikipediaOrigins(variant);
        if (origins && origins.length > 0) break;
    }

    // 3. Si todo falla, intentar con tags similares de Last.fm (usando el nombre original)
    if (!origins || origins.length === 0) {
        // Intentar Last.fm con todas las variantes también
        for (const variant of searchVariants) {
            console.log(t('lastfm_similar_search') + ` (${variant})`);
            origins = await fetchLastFmSimilar(variant);
            if (origins && origins.length > 0) break;
        }
    }

    if (origins && origins.length > 0) {
        console.log(t('origins_found', { count: origins.length }));
        genreDB.add(genreName, origins);

        // FIX: Invalidar caché para que getGenreInfo lea los nuevos datos de la DB
        const normalizedName = normalizeGenreName(genreName);
        if (dynamicGenreTree[normalizedName]) {
            delete dynamicGenreTree[normalizedName];
        }

        await expandGenreNode(genreName);
    } else {
        console.log(t('origins_not_found'));
        alert(t('search_origins_failed', { genreName: genreName }));
    }

    document.body.style.cursor = originalCursor;
}

// Función para expandir un nodo específico (Nivel 3 -> Nivel 4)
async function expandGenreNode(genreName) {
    console.log(`🌳 Expandiendo nodo: ${genreName}`);
    const normalizedGenreName = normalizeGenreName(genreName);
    const genreInfo = await getGenreInfo(genreName);

    if (genreInfo && genreInfo.origins && genreInfo.origins.length > 0) {
        let newNodesAdded = false;

        for (const origin of genreInfo.origins) {
            // Si el origen no está en el gráfico, lo agregamos
            const normalizedOrigin = normalizeGenreName(origin);
            if (!currentGraphNodes.has(normalizedOrigin)) {
                currentGraphNodes.add(normalizedOrigin);
                currentGraphEdges.add(`${normalizedGenreName}|${normalizedOrigin}`);
                newNodesAdded = true;
            } else {
                // Si ya existe el nodo pero no la conexión, agregamos la conexión
                const edge = `${normalizedGenreName}|${normalizedOrigin}`;
                if (!currentGraphEdges.has(edge)) {
                    currentGraphEdges.add(edge);
                    newNodesAdded = true;
                }
            }
        }

        if (newNodesAdded) {
            console.log(t('tree_updated'));
            await renderMermaidGraph();
        } else {
            console.log(t('node_expanded'));
        }
    }
}

async function getGenreLevels(mainGenre, maxDepth = 3) {
    const levels = [[mainGenre]];
    const visited = new Set([mainGenre]);

    for (let i = 0; i < maxDepth; i++) {
        const currentLevel = levels[i];
        const nextLevel = [];

        for (const genre of currentLevel) {
            const genreInfo = await getGenreInfo(genre);
            if (genreInfo && genreInfo.origins) {
                genreInfo.origins.forEach(origin => {
                    const normalizedOrigin = normalizeGenreName(origin);
                    if (!visited.has(normalizedOrigin)) {
                        nextLevel.push(normalizedOrigin);
                        visited.add(normalizedOrigin);
                    }
                });
            }
        }

        if (nextLevel.length > 0) {
            levels.push(nextLevel);
        } else {
            break;
        }
    }

    return levels;
}

// --- Sistema de Modal y Audio ---

function initModalSystem() {
    if (document.getElementById('genre-modal')) return;

    // Inyectar HTML del modal
    const modalHtml = `
        <div id="genre-modal" class="modal">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <div class="modal-header">
                    <h2 id="modal-title" class="modal-title"></h2>
                </div>
                <div id="modal-body"></div>
                <div id="modal-audio"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Eventos de cierre
    const modal = document.getElementById('genre-modal');
    const span = modal.querySelector(".close-button");

    const closeModal = () => {
        modal.style.display = "none";
        const audio = modal.querySelector('audio');
        if (audio) { audio.pause(); audio.currentTime = 0; }
    };

    span.onclick = closeModal;
    window.onclick = (event) => { if (event.target == modal) closeModal(); };
}

async function showGenreModal(genreName) {
    console.log('📺 Abriendo modal para:', genreName);

    const modal = document.getElementById('genre-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const audioContainer = document.getElementById('modal-audio');

    modal.style.display = "block";
    title.textContent = genreName;
    body.innerHTML = `<p>${t('modal_loading_info')}</p>`;
    audioContainer.innerHTML = `<p>${t('modal_loading_audio')}</p>`;

    try {
        // 1. Obtener Info del Género
        const genreInfo = await getGenreInfo(genreName);

        const maxLength = 350;
        if (genreInfo.description && genreInfo.description.length > maxLength) {
            const shortText = genreInfo.description.substring(0, maxLength);
            const longText = genreInfo.description.substring(maxLength);

            body.innerHTML = `
                <p>
                    ${shortText}<span id="desc-dots">...</span><span id="desc-more" style="display:none">${longText}</span>
                    <span id="read-more-btn" style="color:#00f3ff; cursor:pointer; font-weight:bold; margin-left:5px;">${t('read_more')}</span>
                </p>
            `;

            document.getElementById('read-more-btn').onclick = function () {
                const dots = document.getElementById('desc-dots');
                const more = document.getElementById('desc-more');
                const btn = document.getElementById('read-more-btn');

                if (dots.style.display === 'none') {
                    dots.style.display = 'inline';
                    more.style.display = 'none';
                    btn.textContent = t('read_more');
                } else {
                    dots.style.display = 'none';
                    more.style.display = 'inline';
                    btn.textContent = t('read_less');
                }
            };
        } else {
            body.innerHTML = `
                <p>${genreInfo.description}</p>
            `;
        }

        // 2. Obtener Preview de Audio
        const trackInfo = await getGenreTrackPreview(genreName);

        if (trackInfo && trackInfo.previewUrl) {
            audioContainer.innerHTML = `
                <div class="track-preview">
                    <img src="${trackInfo.image || 'https://via.placeholder.com/60'}" width="60" height="60" style="border-radius:4px;">
                    <div class="track-info">
                        <span class="track-name">${t('example')} ${trackInfo.title}</span>
                        <span class="artist-name">${t('by')} <a href="#" onclick="document.getElementById('bandInput').value = '${trackInfo.artist.replace(/'/g, "\\'")}'; searchBand(); document.getElementById('genre-modal').style.display='none'; return false;" style="color: #00f3ff; text-decoration: none; border-bottom: 1px dotted #00f3ff;" title="${t('search_this_band')}">${trackInfo.artist}</a></span>
                        <audio controls autoplay name="media">
                            <source src="${trackInfo.previewUrl}" type="audio/mpeg">
                        </audio>
                    </div>
                </div>
            `;
        } else {
            // Fallback: Video de YouTube
            // Simplificamos la búsqueda para evitar errores de "invalidVideodata"
            const searchQuery = (trackInfo ? `${trackInfo.title} ${trackInfo.artist}` : `${genreName} music`).trim();
            const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

            let displayHtml = '';
            if (trackInfo) {
                displayHtml = `
                    <span class="track-name" style="margin-bottom:5px;">${t('watch_on_youtube')} ${trackInfo.title}</span>
                    <span class="artist-name" style="display:block; margin-bottom:10px; font-size:0.9em; color:#888;">
                        ${t('by')} <a href="#" onclick="document.getElementById('bandInput').value = '${trackInfo.artist.replace(/'/g, "\\'")}'; searchBand(); document.getElementById('genre-modal').style.display='none'; return false;" style="color: #00f3ff; text-decoration: none; border-bottom: 1px dotted #00f3ff;" title="${t('search_this_band')}">${trackInfo.artist}</a>
                    </span>
                 `;
            } else {
                displayHtml = `<span class="track-name" style="margin-bottom:10px;">${t('watch_related_on_youtube')} ${genreName}</span>`;
            }

            audioContainer.innerHTML = `
                <div class="track-preview" style="display:block; text-align:center;">
                    ${displayHtml}
                    <a href="${ytUrl}" target="_blank" style="background:#ff0000; color:white; text-decoration:none; padding:10px 20px; border-radius:5px; font-weight:bold; display:inline-block; margin-top:10px; transition: transform 0.2s;">${t('open_on_youtube')}</a>
                </div>
            `;
        }
    } catch (error) {
        console.error(error);
        body.innerHTML = '<p>Error cargando detalles.</p>';
    }
}

async function showBandModal(bandName) {
    console.log('📺 Abriendo modal para banda:', bandName);
    initModalSystem();

    const modal = document.getElementById('genre-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const audioContainer = document.getElementById('modal-audio');

    modal.style.display = "block";
    title.textContent = bandName;
    body.innerHTML = `<p>${t('modal_loading_bio')}</p>`;
    audioContainer.innerHTML = `<p>${t('modal_loading_track')}</p>`;

    try {
        // 1. Obtener Biografía (Last.fm)
        const bio = await getBandBio(bandName);
        body.innerHTML = `<p>${bio}</p>`;

        // 2. Obtener Preview de Audio
        const trackInfo = await getBandTrackPreview(bandName);

        if (trackInfo && trackInfo.previewUrl) {
            audioContainer.innerHTML = `
                <div class="track-preview">
                    <img src="${trackInfo.image || 'https://via.placeholder.com/60'}" width="60" height="60" style="border-radius:4px;">
                    <div class="track-info">
                        <span class="track-name">🎵 ${trackInfo.title}</span>
                        <span class="artist-name">${trackInfo.artist}</span>
                        <audio controls autoplay name="media">
                            <source src="${trackInfo.previewUrl}" type="audio/mpeg">
                        </audio>
                    </div>
                </div>
            `;
        } else {
            // Fallback: Video de YouTube
            // Usamos solo el nombre de la banda, "top songs" a veces rompe el search del embed
            const searchQuery = `${bandName} music`;
            const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

            audioContainer.innerHTML = `
                <div class="track-preview" style="display:block; text-align:center;">
                    <span class="track-name" style="margin-bottom:10px;">${t('watch_on_youtube')} ${bandName}</span>
                    <a href="${ytUrl}" target="_blank" style="background:#ff0000; color:white; text-decoration:none; padding:10px 20px; border-radius:5px; font-weight:bold; display:inline-block; margin-top:10px; transition: transform 0.2s;">${t('open_on_youtube')}</a>
                </div>
            `;
        }
    } catch (error) {
        console.error(error);
        body.innerHTML = '<p>Error cargando detalles de la banda.</p>';
    }
}

async function getBandBio(bandName) {
    // Helper para buscar bio en un idioma específico
    const fetchBio = async (lang) => {
        try {
            const response = await fetch(
                `${API_CONFIG.lastfm.baseUrl}?method=artist.getinfo&artist=${encodeURIComponent(bandName)}&api_key=${API_CONFIG.lastfm.key}&format=json&lang=${lang}`
            );
            if (response.ok) {
                const data = await response.json();
                let bio = data.artist?.bio?.summary;
                if (bio) {
                    // Limpiar enlaces y HTML básico
                    bio = bio.replace(/\s*<a href="[^"]*last\.fm[^"]*"[^>]*>.*?<\/a>\s*/i, '');
                    bio = bio.replace(/<[^>]+>/g, '');
                    // Decodificar entidades básicas
                    bio = bio.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                    bio = bio.trim();
                    // Retornar solo si hay texto real y sustancial
                    if (bio && bio.length > 20 && bio !== '.') {
                        return bio;
                    }
                }
            }
        } catch (e) { console.error(e); }
        return null;
    };

    // 1. Intentar en idioma actual
    let bio = await fetchBio(currentLanguage);

    // 2. Si falla y no estamos en inglés, intentar en inglés (Fallback)
    if (!bio && currentLanguage !== 'en') {
        console.log(`Bio no encontrada en ${currentLanguage}, intentando en inglés...`);
        bio = await fetchBio('en');
    }

    return bio || t('bio_unavailable');
}

async function getBandTrackPreview(bandName) {
    try {
        // iTunes search for artist tracks (entity=song)
        const itRes = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(bandName)}&media=music&entity=song&limit=1`);
        const itData = await itRes.json();

        if (itData.results?.[0]) {
            return {
                title: itData.results[0].trackName,
                artist: itData.results[0].artistName,
                previewUrl: itData.results[0].previewUrl,
                image: itData.results[0].artworkUrl100
            };
        }
    } catch (e) { console.warn("Audio preview error:", e); }
    return null;
}

async function getGenreTrackPreview(genreName) {
    try {
        // Last.fm: Top Tracks del género
        const lfRes = await fetch(`${API_CONFIG.lastfm.baseUrl}?method=tag.gettoptracks&tag=${encodeURIComponent(genreName)}&api_key=${API_CONFIG.lastfm.key}&format=json&limit=1&lang=${currentLanguage}`);
        const lfData = await lfRes.json();
        const track = lfData.tracks?.track?.[0];
        if (!track) return null;

        // iTunes: Buscar preview (gratis y público)
        const term = `${track.name} ${track.artist.name}`;
        const itRes = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=1`);
        const itData = await itRes.json();

        if (itData.results?.[0]) {
            return {
                title: itData.results[0].trackName,
                artist: itData.results[0].artistName,
                previewUrl: itData.results[0].previewUrl,
                image: itData.results[0].artworkUrl100
            };
        }

        // Si iTunes falla, devolvemos la info de Last.fm para que el buscador de YouTube sea preciso
        return {
            title: track.name,
            artist: track.artist.name,
            previewUrl: null,
            image: (track.image && track.image.length > 2) ? track.image[2]['#text'] : null
        };
    } catch (e) { console.warn("Audio preview error:", e); }
    return null;
}

function capitalizeWords(str) {
    return str.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

document.getElementById('bandInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchBand();
    }
});

// Función para buscar orígenes dinámicamente en Wikidata
async function fetchDynamicOrigins(genreName) {
    try {
        // Paso 1: Buscar el ID de la entidad (QID) usando la API de búsqueda (Rápido)
        const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(genreName)}&language=${currentLanguage}&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        if (!searchData.search || searchData.search.length === 0) {
            console.warn(`WikiData: No se encontró entidad para "${genreName}"`);
            return [];
        }

        // Tomamos el primer resultado
        const qid = searchData.search[0].id;
        console.log(`WikiData: ID encontrado para ${genreName}: ${qid}`);

        // Paso 2: Consultar SPARQL solo para ese ID específico (Muy rápido)
        const sparqlQuery = `
            SELECT DISTINCT ?originLabel WHERE {
                wd:${qid} wdt:P1535 ?origin .
                ?origin rdfs:label ?originLabel .
                FILTER(LANG(?originLabel) = "${currentLanguage}")
            } LIMIT 5
        `;

        const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}&format=json`;
        const response = await fetch(url, { headers: { 'Accept': 'application/sparql-results+json' } });

        if (response.ok) {
            const data = await response.json();

            console.log(`WikiData: Orígenes encontrados para ${genreName}:`, data.results.bindings.length);
            return data.results.bindings
                .map(b => normalizeGenreName(b.originLabel.value))
                .filter(name => !isBlacklisted(name));
        }
    } catch (error) {
        console.warn(`WikiData: No se pudieron obtener orígenes para ${genreName}`, error);
    }
    return [];
}

// Función para obtener descripción de Wikipedia (Fallback para Last.fm)
async function getWikipediaDescription(genreName) {
    try {
        // 1. Intentar búsqueda directa por título
        let url = `https://${currentLanguage}.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${encodeURIComponent(genreName)}&exintro=1&explaintext=1&origin=*&redirects=1`;
        let res = await fetch(url);
        let data = await res.json();

        let pages = data.query?.pages;
        let pageId = pages ? Object.keys(pages)[0] : '-1';

        if (pageId !== '-1') {
            const extract = pages[pageId].extract;
            // Verificar que no sea una página de desambiguación o vacía
            if (extract && !extract.includes("may refer to:")) {
                console.log(`✅ Wikipedia: Extracto encontrado para ${genreName}`);
                return extract;
            }
        }

        // 2. Si falla, usar el motor de búsqueda de Wikipedia (más robusto)
        console.log(`🔍 Wikipedia: Buscando artículo para "${genreName} music"...`);
        url = `https://${currentLanguage}.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(genreName + " music")}&prop=extracts&exintro=1&explaintext=1&gsrlimit=1&origin=*`;
        res = await fetch(url);
        data = await res.json();
        pages = data.query?.pages;

        if (pages) {
            pageId = Object.keys(pages)[0];
            if (pageId) {
                console.log(`✅ Wikipedia: Extracto encontrado por búsqueda para ${genreName}`);
                return pages[pageId].extract;
            }
        }
    } catch (e) {
        console.warn('Wikipedia description error:', e);
    }
    return null;
}

// Función para buscar orígenes en Wikipedia (Fallback)
async function fetchWikipediaOrigins(genreName) {
    try {
        // Buscar la página y parsear la sección introductoria (donde suele estar la Infobox)
        const url = `https://${currentLanguage}.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(genreName)}&prop=text&format=json&section=0&origin=*&redirects=1`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.parse && data.parse.text) {
            const html = data.parse.text['*'];

            // Buscar la fila de "Stylistic origins" en la tabla infobox
            // Regex busca: Header "Stylistic origins" -> celda de datos -> contenido
            const originHeaderRegex = /(?:Stylistic origins|Cultural origins|Origins|Parent genre|Derivatives|Subgenre of)<\/th>[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>/i;
            const match = html.match(originHeaderRegex);

            if (match && match[1]) {
                const content = match[1];
                // Extraer texto de los enlaces dentro de esa celda
                const linkRegex = /<a href="\/wiki\/[^"]*"[^>]*>(.*?)<\/a>/g;
                const origins = [];
                let linkMatch;
                while ((linkMatch = linkRegex.exec(content)) !== null) {
                    const normalized = normalizeGenreName(linkMatch[1]);
                    if (!isBlacklisted(normalized)) {
                        origins.push(normalized);
                    }
                }
                return origins;
            }
        }
    } catch (e) {
        console.warn('Wikipedia parse error:', e);
    }
    return [];
}

async function fetchLastFmSimilar(genreName) {
    try {
        const response = await fetch(
            `${API_CONFIG.lastfm.baseUrl}?method=tag.getsimilar&tag=${encodeURIComponent(genreName)}&api_key=${API_CONFIG.lastfm.key}&format=json&lang=${currentLanguage}`
        );
        if (response.ok) {
            const data = await response.json();
            const similarTags = data.similartags?.tag || [];

            if (similarTags.length > 0) {
                console.log(`✅ Last.fm: Encontrados ${similarTags.length} tags similares.`);
                return similarTags
                    .slice(0, 5) // Tomar los 5 más relevantes
                    .map(tag => normalizeGenreName(tag.name))
                    .filter(name => !isBlacklisted(name) && name.toLowerCase() !== genreName.toLowerCase());
            }
        }
    } catch (e) {
        console.warn('Last.fm similar tags error:', e);
    }
    return [];
}

/* Lista negra de términos que no son géneros musicales */
const GENRE_BLACKLIST = [
    "music genre", "music style", "radio format", "music", "organization", "social system",
    "culture", "movement", "art movement", "history", "society", "human", "concept",
    "type", "style", "form", "practice", "tradition", "performance", "group", "band",
    "artist", "musician", "song", "album", "instrument", "united states", "united kingdom",
    "20th century", "1960s", "1970s", "1980s", "1990s", "phenomenon", "activity", "behavior",
    "classification", "category", "topic", "field", "discipline", "sector", "industry",
    "subculture", "lifestyle", "radio", "media", "entertainment", "art", "arts"
];

function isBlacklisted(name) {
    if (!name) return true;
    const lower = name.toLowerCase();
    if (GENRE_BLACKLIST.includes(lower)) return true;
    if (lower.startsWith("list of")) return true;
    if (lower.startsWith("history of")) return true;
    return false;
}

// Función de normalización de nombres de géneros
function normalizeGenreName(str) {
    if (!str) return '';
    // 0. Eliminar etiquetas HTML residuales (ej. <i>Rock</i>)
    str = str.replace(/<[^>]*>/g, '');
    // 1. Decodificar entidades HTML básicas
    let name = str.replace(/&amp;/g, '&');
    // 2. Reemplazar & por 'and' para consistencia con seed data
    name = name.replace(/\s*&\s*/g, ' and ');
    // 3. Quitar " music" al final (case insensitive)
    name = name.replace(/\s+music$/i, '');
    // 4. Limpiar espacios y capitalizar
    return capitalizeWords(name.toLowerCase().trim());
}

// --- Fondo Animado de Partículas (Estilo Cyberpunk) ---
function initBackgroundAnimation() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 0.5;
            // Colores neón del tema: Cyan, Pink, Purple, White
            const colors = ['#00f3ff', '#ff0055', '#b026ff', '#ffffff'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Reaparecer al salir de la pantalla (efecto infinito)
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function init() {
        resize();
        // Crear 150 partículas
        for (let i = 0; i < 150; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
    animate();
}

// Iniciar fondo
initBackgroundAnimation();

// --- Funciones de Zoom ---

window.zoomTree = (delta) => {
    treeZoomLevel = Math.max(0.2, Math.min(5, treeZoomLevel + delta));
    applyTreeZoom();
};

window.resetTreeZoom = () => {
    treeZoomLevel = 1;
    applyTreeZoom();
};

function applyTreeZoom() {
    const container = document.getElementById('mermaid-container');
    if (container) {
        container.style.transform = `scale(${treeZoomLevel})`;
    }
}

// --- Autocompletado de Búsqueda ---

document.addEventListener('DOMContentLoaded', () => {
    // Crear e insertar el selector de idioma
    const container = document.querySelector('.container');
    if (container) {
        const langSwitcher = document.createElement('div');
        langSwitcher.className = 'lang-switcher';

        const languages = [
            { code: 'en', label: '🇺🇸 English' },
            { code: 'es', label: '🇪🇸 Español' },
            { code: 'fr', label: '🇫🇷 Français' },
            { code: 'de', label: '🇩🇪 Deutsch' },
            { code: 'it', label: '🇮🇹 Italiano' },
            { code: 'pt', label: '🇧🇷 Português' },
            { code: 'ja', label: '🇯🇵 日本語' }
        ];

        const options = languages.map(lang =>
            `<option value="${lang.code}" ${lang.code === currentLanguage ? 'selected' : ''}>${lang.label}</option>`
        ).join('');

        langSwitcher.innerHTML = `
            <select onchange="setLanguage(this.value)" class="lang-select" title="Seleccionar Idioma">
                ${options}
            </select>
        `;
        container.insertBefore(langSwitcher, container.firstChild);
        updateStaticUI(); // Actualizar textos estáticos al cargar
    }

    const input = document.getElementById('bandInput');
    const searchSection = document.querySelector('.search-section');
    let debounceTimer;

    // Crear contenedor de sugerencias si no existe
    let suggestionsBox = document.createElement('div');
    suggestionsBox.className = 'suggestions-box';
    searchSection.appendChild(suggestionsBox);

    // Escuchar escritura
    input.addEventListener('input', function () {
        const query = this.value.trim();
        clearTimeout(debounceTimer);

        if (query.length < 2) {
            suggestionsBox.style.display = 'none';
            return;
        }

        // Esperar 300ms antes de buscar (Debounce)
        debounceTimer = setTimeout(() => fetchSuggestions(query), 300);
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (e.target !== input && e.target !== suggestionsBox) {
            suggestionsBox.style.display = 'none';
        }
    });

    async function fetchSuggestions(query) {
        try {
            const response = await fetch(
                `${API_CONFIG.lastfm.baseUrl}?method=artist.search&artist=${encodeURIComponent(query)}&api_key=${API_CONFIG.lastfm.key}&format=json&limit=5`
            );
            const data = await response.json();
            const artists = data.results?.artistmatches?.artist || [];
            renderSuggestions(artists);
        } catch (error) {
            console.warn('Error en autocompletado:', error);
        }
    }

    function renderSuggestions(artists) {
        if (artists.length === 0) {
            suggestionsBox.style.display = 'none';
            return;
        }
        suggestionsBox.innerHTML = artists.map(artist =>
            `<div class="suggestion-item" onclick="selectSuggestion('${artist.name.replace(/'/g, "\\'")}')">${artist.name}</div>`
        ).join('');
        suggestionsBox.style.display = 'block';
    }
});

window.selectSuggestion = (name) => {
    const input = document.getElementById('bandInput');
    const suggestionsBox = document.querySelector('.suggestions-box');
    input.value = name;
    suggestionsBox.style.display = 'none';
    searchBand(); // Ejecutar búsqueda automáticamente
};
interface Bookmarks {
  label: string;
  url_img: string;
  url_redirection: string;
}

const BOOKMARKS_PRO: Bookmarks[] = [
  {
    label: "Github",
    url_img: "./../public/asset/icon/github.png",
    url_redirection: "https://github.com/",
  },
  {
    label: "GitLab",
    url_img: "./../public/asset/icon/gitlab.png",
    url_redirection: "https://gitlab.univ-lille.fr/hugo.straseele.etu",
  },
  {
    label: "LinkedIn",
    url_img: "./../public/asset/icon/Linkedin.png",
    url_redirection: "https://www.linkedin.com/feed/",
  },
  {
    label: "Gmail",
    url_img: "./../public/asset/icon/gmail.png",
    url_redirection: "https://mail.google.com/mail/u/0/#inbox",
  },
  {
    label: "Agenda",
    url_img: "./../public/asset/icon/agenda.png",
    url_redirection: "https://calendar.google.com/calendar",
  },
  {
    label: "Wakatime",
    url_img: "./../public/asset/icon/wakatime.png",
    url_redirection: "https://wakatime.com/dashboard",
  },
  {
    label: "Portfolio",
    url_img: "./../public/asset/icon/portfolio.png",
    url_redirection: "https://montsy744.github.io/portfolio/",
  },
  {
    label: "ENT",
    url_img: "./../public/asset/icon/ent.png",
    url_redirection: "",
  },
  {
    label: "Moodle",
    url_img: "./../public/asset/icon/moodle.png",
    url_redirection: "",
  },
];

const BOOKMARKS_PERSO: Bookmarks[] = [
  {
    label: "Youtube",
    url_img: "./../public/asset/icon/youtube.png",
    url_redirection: "https://www.youtube.com/",
  },
  {
    label: "Twitch Studio",
    url_img: "./../public/asset/icon/twitch.png",
    url_redirection: "https://dashboard.twitch.tv/",
  },
  {
    label: "Spotify",
    url_img: "./../public/asset/icon/spotify.png",
    url_redirection: "https://open.spotify.com/",
  },
  {
    label: "Canva",
    url_img: "./../public/asset/icon/canva.png",
    url_redirection: "https://www.canva.com/",
  },
  {
    label: "Maps",
    url_img: "./../public/asset/icon/maps.png",
    url_redirection: "https://maps.google.com/",
  },
  {
    label: "Pinterest",
    url_img: "./../public/asset/icon/pinterest.png",
    url_redirection: "https://www.pinterest.com/",
  },
  {
    label: "Discord",
    url_img: "./../public/asset/icon/discord.png",
    url_redirection: "https://discord.com/channels/@me",
  },
  {
    label: "WhatsApp",
    url_img: "./../public/asset/icon/watsapp.png",
    url_redirection: "https://web.whatsapp.com/",
  },
  {
    label: "Messenger",
    url_img: "./../public/asset/icon/messenger.png",
    url_redirection: "https://www.messenger.com/",
  },
  {
    label: "Instagram",
    url_img: "./../public/asset/icon/instagram.png",
    url_redirection: "https://www.instagram.com/",
  },
  {
    label: "TikTok",
    url_img: "./../public/asset/icon/tiktok.png",
    url_redirection: "https://www.tiktok.com/",
  },
  {
    label: "Reddit",
    url_img: "./../public/asset/icon/reddit.png",
    url_redirection: "https://www.reddit.com/",
  },
  {
    label: "X",
    url_img: "./../public/asset/icon/x.png",
    url_redirection: "https://x.com/",
  },
  {
    label: "Netflix",
    url_img: "./../public/asset/icon/netflix.png",
    url_redirection: "https://www.netflix.com/",
  },
  {
    label: "Disney+",
    url_img: "./../public/asset/icon/disney+.png",
    url_redirection: "https://www.disneyplus.com/",
  },
  {
    label: "HBO",
    url_img: "./../public/asset/icon/hbo.png",
    url_redirection: "https://www.hbomax.com/",
  },
  {
    label: "Prime Video",
    url_img: "./../public/asset/icon/prime.png",
    url_redirection: "https://www.primevideo.com/",
  },
  {
    label: "TF1+",
    url_img: "./../public/asset/icon/tf1+.png",
    url_redirection: "https://www.tf1.fr/",
  },
  {
    label: "PlayStation",
    url_img: "./../public/asset/icon/playstation.png",
    url_redirection: "https://www.playstation.com/fr-fr/",
  },
  {
    label: "Steam",
    url_img: "./../public/asset/icon/steam.png",
    url_redirection: "https://store.steampowered.com/",
  },
  {
    label: "Epic Games",
    url_img: "./../public/asset/icon/epic_games.png",
    url_redirection: "https://store.epicgames.com/",
  },
  {
    label: "Leboncoin",
    url_img: "./../public/asset/icon/leboncoin.png",
    url_redirection: "https://www.leboncoin.fr/",
  },
];

export { BOOKMARKS_PERSO, BOOKMARKS_PRO, Bookmarks };

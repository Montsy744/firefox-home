interface Bookmarks {
    label : string,
    url_img: string
    url_redirection: string
}

const BOOKMARKS_PRO : Bookmarks[] = [
    {
        label: "Github",
        url_img: "./../public/asset/icon/github.png",
        url_redirection: "https://github.com/",
    },
    {
        label: "LinkedIn",
        url_img: "./../public/asset/icon/Linkedin.png",
        url_redirection: "https://www.linkedin.com/feed/",
    },
    {
        label: "GitLab",
        url_img: "./../public/asset/icon/gitlab.png",
        url_redirection: "https://gitlab.univ-lille.fr/hugo.straseele.etu",
    },
    {
        label: "Gmail",
        url_img: "./../public/asset/icon/gmail.png",
        url_redirection: "https://mail.google.com/mail/u/0/#inbox",
    },
    {
        label: "Agenda",
        url_img: "./../public/asset/icon/agenda.png",
        url_redirection: "",
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
    }
]

export {
    BOOKMARKS_PRO,
    Bookmarks
}
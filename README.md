# Euskera-ikasten

## MaiAditza

Euskal aditzak praktikatzeko aplikazioa. Bi ariketa mota:

- **Taulak**: NOR, NOR-NORI, NOR-NORK, NOR-NORI-NORK eta aditz trinkoak (egon, joan, etorri, ibili, jakin, eduki). Taula osoa bete edo formak banan-banan idatzi. NOR aukeratu daiteke.
- **Esaldiak**: esaldian falta den aditz-forma idatzi.

Formak Santurtziko EUSko «Aditzak» liburuarekin egiaztatuta (A2): <https://ikasgela.santurtzieus.com/mod/book/view.php?id=20491&chapterid=3270>

Web instalagarria da (PWA): mugikorrean ireki eta "Gehitu hasierako pantailan" aukeratu. Lehen bisitaren ondoren konexiorik gabe ere dabil.

### Egitura

- `index.html`: orria
- `css/style.css`: estiloak (kolore argiak eta ilunak `:root`-en)
- `js/data.js`: taulak (`add(...)`) eta esaldiak (`sent(...)`). Formak hutsunez bereizita, `/` aukerentzat, `-` hutsunerako
- `js/app.js`: ariketaren logika
- `sw.js`, `manifest.webmanifest`, `icons/`: instalatzeko eta lineaz kanpo erabiltzeko

### Lokalean probatzeko

```
python3 -m http.server 8000
```

eta ireki http://localhost:8000

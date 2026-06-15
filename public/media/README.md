# 📁 public/media — Logo e Vídeo do Hero

Coloque aqui os arquivos da marca e o vídeo de fundo do Hero.
Tudo dentro de `public/` é servido a partir da **raiz** do site, então o caminho
público **não inclui** a palavra `public`.

| Arquivo no disco | URL no site |
| --- | --- |
| `public/media/logo/logo-immovi.svg` | `/media/logo/logo-immovi.svg` |
| `public/media/hero/hero.mp4` | `/media/hero/hero.mp4` |

---

## 🟢 Logo → `public/media/logo/`

Recomendado enviar (use estes nomes para a gente plugar direto no código):

| Nome sugerido | Uso | Observações |
| --- | --- | --- |
| `logo-immovi.svg` | Logo principal | Fundo transparente, formato horizontal |
| `logo-immovi-branco.svg` | Header e Footer (fundo escuro) | Versão clara/branca da logo |
| `logo-immovi-icone.svg` | Favicon / ícone | Versão quadrada (símbolo) |

- Prefira **SVG** (fica nítido em qualquer tela). PNG com fundo transparente
  também funciona (envie em alta, ex.: 600px de largura).
- Hoje o Header e o Footer usam a logo em **texto** ("Immovi."). Assim que você
  colocar o arquivo aqui, é só me avisar que eu troco pelo arquivo usando
  `next/image`.

---

## 🎬 Vídeo do Hero → `public/media/hero/`

Recomendado enviar:

| Nome sugerido | Uso | Observações |
| --- | --- | --- |
| `hero.mp4` | Vídeo de fundo (obrigatório) | Codec **H.264**, 1920×1080, sem áudio |
| `hero.webm` | Alternativa leve (opcional) | Melhora o carregamento em alguns navegadores |
| `hero-poster.jpg` | Imagem de fallback | Aparece antes do vídeo carregar (1920×1080) |

Boas práticas para não pesar o site:
- Duração curta em loop: **6–12 segundos**.
- Tamanho do arquivo: idealmente **abaixo de 5 MB** (comprima o `.mp4`).
- Sem áudio (o vídeo de fundo roda mudo e em autoplay).
- Sempre envie o `hero-poster.jpg` — ele é mostrado no mobile e enquanto o vídeo
  baixa, evitando "tela preta".

---

## ▶️ Próximo passo

Depois de colocar os arquivos nas pastas, me chame que eu:
1. troco a logo de texto pelos arquivos no Header e no Footer;
2. ativo o vídeo de fundo no Hero (com poster, autoplay mudo, loop e versão
   estática no mobile para economizar dados).

# Аудит бандла

Дата анализа: 2026-04-23.

## Что запускалось

```bash
npm run build
node scripts (локальный анализ source map и размеров чанков)
```

## Состав production-бандла (build/static/js)

| Chunk |    Размер (KB) |
|---|---------------:|
| main.13220f82.js |       63.01 |
| 510.33d41706.chunk.js |          34.6 |
| 177.fe96b2a0.chunk.js |         2.1 |
|main.97fb6780.css|           1.84 |
| 62.9e6a9896.chunk.js |           1.09 |
| 82.1a2a7538.chunk.js |          0.6 |
| 535.637b7e2a.chunk.js |           0.6 |
| 114.a1cb4609.chunk.js |            0.3 |

## Самые тяжёлые зависимости

По source map `510.*.chunk.js` наиболее ёмкие группы модулей связаны с markdown-пайплайном:

- `mdast-util-to-hast`
- `micromark-core-commonmark`
- `react-markdown`

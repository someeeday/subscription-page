# Берег — Subscription Page

Брендированная версия [Remnawave Subscription Page](https://github.com/remnawave/subscription-page) для VPN «Берег».

## Ссылки

- Telegram-бот: https://t.me/PribrezhnyBot
- Поддержка: https://t.me/PribrezhnySupport

## Docker image

После включения GitHub Actions изменения из `main` автоматически собираются в:

```text
ghcr.io/someeeday/subscription-page:latest
```

В `docker-compose-prod.yml` уже указан этот image.

## Обновление на сервере

```bash
docker compose pull remnawave-subscription-page
docker compose up -d remnawave-subscription-page
```

## Брендинг

- локальный знак: `frontend/public/assets/bereg-mark.svg`
- основной цвет: Bereg Blue
- ссылка на поддержку встроена в header
- бот и поддержка вынесены в отдельный Telegram-блок на странице

Проект сохраняет лицензию AGPL-3.0 исходного Remnawave Subscription Page.

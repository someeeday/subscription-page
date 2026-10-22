# Берег — Subscription Page

Брендированная версия [Remnawave Subscription Page](https://github.com/remnawave/subscription-page) для VPN «Берег».

**Upstream:** Remnawave Subscription Page v8.0.1. Обновления upstream переносятся в этот форк с сохранением фирменного интерфейса.

## Ссылки

- Telegram-бот: https://t.me/PribrezhnyBot
- Поддержка: https://t.me/PribrezhnySupport

## Брендинг

- Логотип: `frontend/public/assets/bereg-mark.svg`
- Основной цвет: Bereg Blue
- Кастомные стили: `frontend/src/global.css`
- Оформление и Telegram-блок: `frontend/src/pages/main/ui/components/main.page.component.tsx`
- Фирменная тема: `frontend/src/shared/constants/theme/theme.ts`

Изменения этих файлов нужно сохранять при синхронизации с upstream.

## Сборка и публикация

`.github/workflows/bereg-build.yml` при push в `main` собирает и публикует:

```text
ghcr.io/someeeday/subscription-page:latest
ghcr.io/someeeday/subscription-page:<commit-sha>
```

Pull Request проверяется отдельным workflow, который собирает фронтенд и Docker-образ **без публикации**. Перед обновлением `main` проверьте результат сборки.

## Развёртывание «Берег»

На рабочем сервере используется собственный Compose-проект:

- каталог: `/opt/bereg/subscription`
- сервис Compose и контейнер: `bereg-subscription`
- Docker-образ: `ghcr.io/someeeday/subscription-page:latest`

После успешной сборки и публикации образа:

```bash
cd /opt/bereg/subscription
docker compose config --services
docker compose pull bereg-subscription
docker compose up -d --no-deps bereg-subscription
docker compose ps
docker logs --tail=80 bereg-subscription
```

**Важно:** публикация образа в GHCR сама по себе не обновляет запущенный контейнер. Команды выше выполняются вручную на сервере после проверки нового образа.

`docker-compose-prod.yml` в репозитории — пример для типового Remnawave; реальные имя сервиса и каталог на сервере «Берег» отличаются.

## Лицензия

Проект сохраняет исходную лицензию AGPL-3.0.

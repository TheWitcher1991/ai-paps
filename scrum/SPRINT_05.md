# Sprint 5: User Management & Permissions

**Продолжительность:** 2 недели (14 дней)
**Цель:** Завершить систему управления пользователями и правами доступа

## Overview

Sprint 5 фокусируется на:

- Управлении пользователями
- Системе ролей и разрешений
- Аутентификации и авторизации
- Организациях и командах

## Задачи

### 5.1 User Management

**Описание:** Полноценное управление пользователями

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| USR-001 | Расширенная модель User (профиль) | - | MUST |
| USR-002 | CRUD пользователей (admin) | USR-001 | MUST |
| USR-003 | Профиль пользователя (изменение данных) | USR-002 | MUST |
| USR-004 | Смена пароля | USR-003 | MUST |
| USR-005 | Avatar загрузка | USR-004 | SHOULD |
| USR-006 | Восстановление пароля (email) | USR-005 | SHOULD |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| USR-101 | Страница профиля пользователя | - | MUST |
| USR-102 | Форма редактирования профиля | USR-101 | MUST |
| USR-103 | UI смены пароля | USR-102 | SHOULD |
| USR-104 | Аватар и настройки отображения | USR-103 | SHOULD |

**Критерии приёмки:**
- [ ] Профиль редактируется
- [ ] Пароль меняется
- [ ] Avatar загружается

---

### 5.2 Roles & Permissions

**Описание:** Система ролей и прав доступа

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| PERM-001 | Определение ролей (Admin, User, Viewer) | - | MUST |
| PERM-002 | Permission системы на уровне API | PERM-001 | MUST |
| PERM-003 | Permission на уровне объектов (object-level) | PERM-002 | SHOULD |
| PERM-004 | Роли в проектах (Owner, Editor, Viewer) | PERM-003 | MUST |
| PERM-005 | Ограничение доступа к моделям и датасетам | PERM-004 | MUST |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| PERM-101 | Admin панель управления пользователями | - | MUST |
| PERM-102 | UI управления правами | PERM-101 | MUST |
| PERM-403 | Страница 403 (доступ запрещен) | PERM-102 | MUST |

**Критерии приёмки:**
- [ ] Разные роли имеют разные права
- [ ] Admin может управлять пользователями
- [ ] 403 страница отображается при отсутствии доступа

---

### 5.3 Organization & Teams

**Описание:** Организации и команды пользователей

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| ORG-001 | Модель Organization | - | MUST |
| ORG-002 | Модель OrganizationMember | ORG-001 | MUST |
| ORG-003 | Приглашение в организацию | ORG-002 | SHOULD |
| ORG-004 | Роли в организации | ORG-003 | MUST |
| ORG-005 | Лимиты использования (квоты) | ORG-004 | SHOULD |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| ORG-101 | UI создания организации | - | MUST |
| ORG-102 | Dashboard организации | ORG-101 | MUST |
| ORG-103 | Управление участниками | ORG-102 | SHOULD |
| ORG-104 | Настройки организации | ORG-103 | SHOULD |

**Критерии приёмки:**
- [ ] Организации создаются
- [ ] Участники добавляются
- [ ] Роли работают

---

### 5.4 Authentication Enhancement

**Описание:** Улучшение аутентификации

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| AUTH-001 | Refresh token rotation | - | MUST |
| AUTH-002 | Access token expiration | AUTH-001 | MUST |
| AUTH-003 | Logout (token invalidation) | AUTH-002 | MUST |
| AUTH-004 | API rate limiting | AUTH-003 | SHOULD |
| AUTH-005 | 2FA (двухфакторная) | AUTH-004 | SHOULD |

---

## Технические детали

### Permission System

```python
# services/core/packages/framework/permissions.py

class Permission:
    """Базовый класс разрешения."""
    
    def has_permission(self, request, view):
        raise NotImplementedError
    
    def has_object_permission(self, request, view, obj):
        raise NotImplementedError


class IsOwner(Permission):
    """Разрешение для владельца объекта."""
    
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class IsProjectMember(Permission):
    """Разрешение для участников проекта."""
    
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'project'):
            return ProjectMember.objects.filter(
                project=obj.project,
                user=request.user
            ).exists()
        return False


# Usage in views
class MyView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]
```

### Roles Definition

```python
# services/core/users/types.py

class UserRole(StrEnum):
    """Системные роли пользователей."""
    ADMIN = "admin"
    USER = "user"
    VIEWER = "viewer"


class ProjectRole(StrEnum):
    """Роли в проекте."""
    OWNER = "owner"
    EDITOR = "editor"
    VIEWER = "viewer"


class OrganizationRole(StrEnum):
    """Роли в организации."""
    ADMIN = "admin"
    MEMBER = "member"
    VIEWER = "viewer"
```

---

## Definition of Done

- [ ] Управление пользователями работает
- [ ] Система ролей реализована
- [ ] Права доступа работают
- [ ] Организации создаются
- [ ] Authentication работает корректно

---

## Ресурсы

**Backend:**
- Разработчики: 1 backend разработчик
- Ожидаемое время: 60 человеко-часов

**Frontend:**
- Разработчики: 1 frontend разработчик
- Ожидаемое время: 50 человеко-часов

**Total:** 110 человеко-часов
## 1) Область действия и приоритет
- Этот файл является главным источником правил для агентов в корне репозитория.
- Подкаталоги могут иметь локальные инструкции, но они не должны противоречить этому файлу.
- При конфликте: безопасность и целостность данных важнее скорости выполнения.

## 2) Контекст проекта
- Репозиторий использует BMAD-модули в каталоге `_bmad`.
- Рабочие продуктовые и технические артефакты ведутся в `docs`.
- Основные runtime-каталоги: `clients` (frontend), `services` (backend).

## 2.1) Команда разработки
- `@TheWitcher` — Tech Lead, Fullstack Developer

## 3) Базовые правила для всех агентов
- Язык документации по умолчанию: русский. Английский допустим для API-терминов, имён сущностей и стандартов.
- Любое утверждение о текущем состоянии проекта должно опираться на файлы репозитория.
- Запрещено придумывать несуществующие сервисы, эндпоинты, таблицы, env-переменные и процессы.
- Любые рискованные изменения (контракты API, схема БД, auth, платежи, деплой) сопровождаются явным списком рисков и планом отката.
- Не удалять и не переписывать существующие файлы без явной необходимости задачи.

## 4) Единый workflow BMAD
- Discovery: уточнение цели, границ, ограничений, критериев успеха.
- Product/UX: формализация требований, сценариев и UX-решений.
- Architecture: технические решения, контракты интеграций, нефункциональные требования.
- Story prep: разбиение на stories с критериями приёмки.
- Implementation: код + тесты + обновление документации.
- QA: верификация AC, smoke/regression, отчёт о качестве.
- Handoff: короткий итог, что сделано, что осталось, известные риски.

## 5) Требования к артефактам
- Каждый артефакт должен иметь: цель, входные допущения, границы, результат, открытые вопросы.
- Для технических артефактов обязательно: зависимости, риски, критерии приёмки, валидация.
- Для изменений backend/frontend документации обязательно указывать:
  - затронутые модули/сервисы;
  - пользовательский эффект;
  - ограничения и edge cases.

## 6) Критерии качества (DoD)
- Артефакт проверяем: другой агент может воспроизвести вывод по документу без устных пояснений.
- Термины консистентны с уже существующими в `docs`.
- Нет конфликтов между требованиями, архитектурой и реализацией.
- Для implementation-историй: есть тестовая стратегия (unit/integration/e2e по необходимости).
- Для docs: структура читаема, есть разделы "что", "почему", "как проверить".

## 7) Контроль изменений
- Перед крупными правками в docs проверять актуальные файлы в `docs`, `clients`, `services`.
- Не дублировать один и тот же источник правды в разных местах без пометки canonical/source-of-truth.
- Если файл автогенерируемый, изменения вносятся в исходник генерации, а не только в результат.

## 8) Политика по агентам и skills
- Ключевые агенты BMAD и их контракты выходов зафиксированы в `docs/agents/agent-output-contracts.md`.
- При добавлении нового агента обновлять:
  - `_bmad/_config/agent-manifest.csv` (описание/путь),
  - профильные docs в `docs/agents` (контракт выходов),
  - связанные workflow/skill-описания (если применимо).
- При изменении формата выходов агента изменение считается breaking, если ломает следующий шаг workflow.

## 9) Минимальный формат handoff от любого агента
- Что сделано (конкретные артефакты/файлы).
- Что не сделано и почему.
- Риски/ограничения.
- Следующий рекомендуемый шаг.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
    - Provide meaningful alt text for images
    - Use proper heading hierarchy
    - Add labels for form inputs
    - Include keyboard event handlers alongside mouse events
    - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**

- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**

- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**

- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Oxlint + Oxfmt Can't Help

Oxlint + Oxfmt's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Oxlint + Oxfmt can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Oxlint + Oxfmt. Run `pnpm dlx ultracite fix` before committing to ensure compliance.

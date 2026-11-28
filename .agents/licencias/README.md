# Licencias de las skills de `.agents/skills/`

Instaladas el 27 de noviembre de 2026 con `npx skills add <repo> --skill <nombre> -a cursor -y` (CLI `skills` de Vercel Labs). El commit exacto de cada una está en `skills-lock.json`. No se editan a mano: para actualizarlas, `npx skills update`.

| Skill | Repositorio | Licencia | Texto de la licencia |
| --- | --- | --- | --- |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | MIT, según la sección «License» del README del repositorio (el repo no trae archivo LICENSE) | — |
| `accessibility` | [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills) | MIT | `accessibility.LICENSE.txt` |
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills) | Apache-2.0 | `.agents/skills/frontend-design/LICENSE.txt` (viene con la skill) |
| `ux-writing` | [slb2248/ai-ux-skills](https://github.com/slb2248/ai-ux-skills) | MIT | `ux-writing.LICENSE.txt` |
| `supabase-postgres-best-practices` | [supabase/agent-skills](https://github.com/supabase/agent-skills) | MIT | `supabase-postgres-best-practices.LICENSE.txt` |

Los textos de licencia van en esta carpeta, fuera de `.agents/skills/`, para no alterar el `computedHash` que el CLI guarda en `skills-lock.json`.

import os
import re

APP_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
BASE_COURSE = os.path.join(APP_ROOT, 'public/data/course')
BASE_CURRICULA = os.path.join(APP_ROOT, 'src/data/curricula')

class TrackBuilder:
    def __init__(self, slug: str, track_name: str, levels: list, modules: list):
        self.slug = slug
        self.track_name = track_name
        self.levels = levels
        self.modules = modules
        self.course_dir = os.path.join(BASE_COURSE, slug)

    def generate_markdown(self, mod: dict, is_id: bool) -> str:
        lang = 'id' if is_id else 'en'
        title = mod['titleId'] if is_id else mod['titleEn']
        program_title = mod['programId'] if is_id else mod['programEn']
        objectives = mod['objectivesId'] if is_id else mod['objectivesEn']
        explanation = mod['explanationId'] if is_id else mod['explanationEn']
        beginner = mod.get('beginnerId' if is_id else 'beginnerEn', '')
        experiments = mod['experimentsId'] if is_id else mod['experimentsEn']
        challenge = mod['challengeId'] if is_id else mod['challengeEn']
        summary = mod['summaryId'] if is_id else mod['summaryEn']
        level_name = mod['levelNameId'] if is_id else mod['levelNameEn']
        code_lang = mod.get('language', self.slug)
        code = mod['code'].strip()

        obj_list = '\n'.join(f'- {o}' for o in objectives)
        exp_list = '\n'.join(f'- {e}' for e in experiments)

        heading_obj = 'Tujuan Pembelajaran' if is_id else 'Learning Objectives'
        heading_prog = 'Program'
        heading_concepts = 'Konsep Kunci' if is_id else 'Key Concepts'
        heading_beginner = 'Penjelasan untuk Pemula' if is_id else 'Beginner Friendly Explanation'
        heading_exp = 'Eksperimen' if is_id else 'Experiments'
        heading_challenge = 'Tantangan' if is_id else 'Challenge'
        heading_summary = 'Ringkasan' if is_id else 'Summary'

        beginner_section = ''
        if beginner:
            beginner_section = f"---\n\n## {heading_beginner}\n\n{beginner}\n\n"

        md = f"""# {title}

> **Kategori:** {self.track_name} | **Level:** {level_name} | **Minggu {mod['week']}:** {title}

## {heading_obj}

{obj_list}

---

## {heading_prog}: {program_title}

```{code_lang}
{code}
```

---

## {heading_concepts}

{explanation}

---

{beginner_section}## {heading_exp}

{exp_list}

---

## {heading_challenge}

{challenge}

---

## {heading_summary}

{summary}
"""
        return md

    def build(self):
        # 1. Clean existing course directory for this slug
        if os.path.exists(self.course_dir):
            import shutil
            shutil.rmtree(self.course_dir)

        # 2. Write Markdown files
        for mod in self.modules:
            for is_id in [True, False]:
                lang = 'id' if is_id else 'en'
                target_dir = os.path.join(self.course_dir, mod['level'], lang)
                os.makedirs(target_dir, exist_ok=True)
                file_name = f"week{mod['week']}-{mod['topicId']}.md"
                content = self.generate_markdown(mod, is_id)
                with open(os.path.join(target_dir, file_name), 'w', encoding='utf-8') as f:
                    f.write(content)

        # 3. Associate weeks with levels
        for level in self.levels:
            level['weeks'] = [
                {
                    'week': m['week'],
                    'topicId': m['topicId'],
                    'titleId': m['titleId'],
                    'titleEn': m['titleEn']
                }
                for m in self.modules if m['level'] == level['levelId']
            ]

        # 4. Generate TypeScript curriculum file
        os.makedirs(BASE_CURRICULA, exist_ok=True)
        levels_ts = []
        for lvl in self.levels:
            weeks_ts = ',\n'.join(
                f"      {{ week: {w['week']}, topicId: '{w['topicId']}', titleId: {repr(w['titleId'])}, titleEn: {repr(w['titleEn'])} }}"
                for w in lvl['weeks']
            )
            levels_ts.append(f"""  {{
    levelId: '{lvl['levelId']}',
    nameId: {repr(lvl['nameId'])},
    nameEn: {repr(lvl['nameEn'])},
    descId: {repr(lvl['descId'])},
    descEn: {repr(lvl['descEn'])},
    weeks: [
{weeks_ts}
    ],
  }}""")

        joined_levels = ',\n'.join(levels_ts)
        ts_content = f"""import type {{ LevelInfo }} from '../curriculum';

// {self.track_name} curriculum — product-driven research-backed structure
export const {self.slug}Curriculum: LevelInfo[] = [
{joined_levels}
];
"""
        ts_path = os.path.join(BASE_CURRICULA, f"{self.slug}.ts")
        with open(ts_path, 'w', encoding='utf-8') as f:
            f.write(ts_content)

        print(f"[OK] [{self.slug}] Generated {len(self.modules) * 2} markdown files ({len(self.modules)} weeks) across {len(self.levels)} levels.")

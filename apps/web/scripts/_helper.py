import json
import os

def escape_js_string(s):
    return json.dumps(s)

def create_generator_file(slug, track_name, levels, modules):
    lines = []
    lines.append("import { BaseGenerator } from './lib/base-generator.mjs';")
    lines.append("")
    lines.append(f"const gen = new BaseGenerator('{slug}', '{track_name}');")
    lines.append("")
    lines.append("const LEVELS = [")
    for level in levels:
        lines.append("  {")
        lines.append(f"    levelId: '{level['levelId']}',")
        lines.append(f"    nameId: '{level['nameId']}',")
        lines.append(f"    nameEn: '{level['nameEn']}',")
        lines.append(f"    descId: '{level['descId']}',")
        lines.append(f"    descEn: '{level['descEn']}',")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("const MODULES = [")
    
    for mod in modules:
        lines.append("  {")
        lines.append(f"    week: {mod['week']}, level: '{mod['level']}', topicId: '{mod['topicId']}',")
        lines.append(f"    titleId: '{mod['titleId']}', titleEn: '{mod['titleEn']}',")
        lines.append(f"    programId: '{mod['programId']}', programEn: '{mod['programEn']}',")
        lines.append(f"    levelNameId: '{mod['levelNameId']}', levelNameEn: '{mod['levelNameEn']}',")
        lines.append(f"    language: '{mod['language']}',")
        lines.append(f"    code: {escape_js_string(mod['code'])},")
        lines.append(f"    objectivesId: {json.dumps(mod['objectivesId'])},")
        lines.append(f"    objectivesEn: {json.dumps(mod['objectivesEn'])},")
        lines.append(f"    explanationId: {escape_js_string(mod['explanationId'])},")
        lines.append(f"    explanationEn: {escape_js_string(mod['explanationEn'])},")
        lines.append(f"    experimentsId: {json.dumps(mod['experimentsId'])},")
        lines.append(f"    experimentsEn: {json.dumps(mod['experimentsEn'])},")
        lines.append(f"    challengeId: {escape_js_string(mod['challengeId'])},")
        lines.append(f"    challengeEn: {escape_js_string(mod['challengeEn'])},")
        lines.append(f"    summaryId: {escape_js_string(mod['summaryId'])},")
        lines.append(f"    summaryEn: {escape_js_string(mod['summaryEn'])},")
        lines.append("  },")
    
    lines.append("];")
    lines.append("")
    lines.append("// Add weeks to levels")
    lines.append("for (const level of LEVELS) {")
    lines.append("  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({")
    lines.append("    week: m.week, topicId: m.topicId, titleId: m.titleId, titleEn: m.titleEn,")
    lines.append("  }));")
    lines.append("}")
    lines.append("")
    lines.append("gen.writeFiles(MODULES, LEVELS);")
    
    content = "\n".join(lines)
    os.makedirs('scripts', exist_ok=True)
    with open(f'scripts/generate-{slug}-materials.mjs', 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created: scripts/generate-{slug}-materials.mjs ({len(content)} bytes)")

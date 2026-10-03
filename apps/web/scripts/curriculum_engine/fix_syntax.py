import re

def convert_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    # Pattern: 'field': `...`
    # Replace `'field': ` with `'field': """`
    # Replace terminating ``,\n` or ``\n` with `""",\n`
    # Let's inspect fields that use backtick delimiters:
    # 'code': `
    # 'explanationId': `
    # 'explanationEn': `
    # 'beginnerId': `
    # 'beginnerEn': `
    
    # We can do this cleanly:
    text = re.sub(r"('(?:code|explanationId|explanationEn|beginnerId|beginnerEn)'\s*:\s*)`", r'\1"""', text)
    # The closing delimiter for these fields:
    # A line ending with `, or ` alone before the next key or end of dict
    text = re.sub(r"`(\s*,?\s*\n\s*'(?:objectivesId|objectivesEn|explanationId|explanationEn|beginnerId|beginnerEn|experimentsId|experimentsEn|challengeId|challengeEn|summaryId|summaryEn|level|topicId|week))", r'"""\1', text)
    text = re.sub(r"`(\s*,?\s*\n\s*})", r'"""\1', text)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)

convert_file('apps/web/scripts/curriculum_engine/tracks/track_javascript.py')
convert_file('apps/web/scripts/curriculum_engine/tracks/track_javascript_p2.py')
convert_file('apps/web/scripts/curriculum_engine/tracks/track_javascript_p3.py')
print("Conversion attempted.")

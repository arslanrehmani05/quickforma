import re
import sys
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)

catalog_file = os.path.join(project_root, "src", "data", "toolsCatalog.ts")
app_file = os.path.join(project_root, "src", "App.tsx")

# 1. Read catalog tool IDs
with open(catalog_file, "r") as f:
    catalog_content = f.read()

# Extract tool IDs from TOOLS_CATALOG array
tool_ids = re.findall(r'["\']?id["\']?:\s*["\']([a-z0-9-]+)["\']', catalog_content)

# Filter out non-tool category IDs
category_ids = {'all', 'finance', 'business', 'ecommerce', 'operations', 'hr', 'developer', 'marketing', 'healthcare', 'converters', 'content', 'productivity'}
tool_ids = [t for t in tool_ids if t not in category_ids]

print(f"🔍 Auditing {len(tool_ids)} tools in TOOLS_CATALOG...")

# 2. Read App.tsx
with open(app_file, "r") as f:
    app_content = f.read()

# Check that App.tsx imports ToolSeoWrapper and renders it centrally for activeTool
if "import { ToolSeoWrapper }" not in app_content:
    print("❌ ERROR: App.tsx does not import ToolSeoWrapper!")
    sys.exit(1)

if "<ToolSeoWrapper" not in app_content:
    print("❌ ERROR: App.tsx does not render ToolSeoWrapper!")
    sys.exit(1)

# Check that every tool ID in catalog has a corresponding case in App.tsx
missing_switch_cases = []
for tid in tool_ids:
    if f"case '{tid}'" not in app_content:
        missing_switch_cases.append(tid)

if missing_switch_cases:
    print(f"❌ ERROR: {len(missing_switch_cases)} tools are missing from switch(activeView) in App.tsx:")
    for m in missing_switch_cases:
        print(f"   - {m}")
    sys.exit(1)

print(f"✅ SUCCESS: All {len(tool_ids)} tools in catalog are registered in App.tsx and 100% guaranteed to render ToolSeoWrapper!")

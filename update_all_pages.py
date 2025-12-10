#!/usr/bin/env python3
import re

# Read index.html to extract footer
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract footer section (from <div class="aem-Grid...footer to before scripts)
footer_match = re.search(r'(<div class="aem-Grid aem-Grid--12 aem-Grid--default--12 ">\s*<div class="footer".*?</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>)', index_content, re.DOTALL)
footer = footer_match.group(1) if footer_match else ''

# Pages to update
pages = [
    ('organizational-transformation', 'Organizational Transformation'),
    ('employee-engagement', 'Employee Engagement'),
    ('performance-optimization', 'Performance Optimization'),
    ('leadership-professional-development', 'Leadership & Professional Development'),
    ('customer-experience', 'Customer Experience'),
    ('data-management-insights', 'Data Management & Insights')
]

# Hero section template matching home page exactly
def get_hero_template(title):
    return f'''    <div class="kfhomepagebanner aem-GridColumn aem-GridColumn--default--12">


<style>
.kf_home_page_banner .hero_bg:before{{
background-color: rgba(0, 0, 0, 0.5);
}}
.hero-text h1 {{
    font-size: 2.5rem !important;
}}
@media (max-width: 768px) {{
    .hero-text h1 {{
        font-size: 2rem !important;
    }}
}}
</style>
<div class="kf_home_page_banner transparentHeader">

    <div class="banner-wrapper single-banner">
         
         
            <div class="hero_bg" style="background-image: url(images/BMT_Header_567x677.jpg); background-size: cover; background-position: center;">
                
                <div style="background-image: url(images/BMT_Header_567x677.jpg);" class="bg-image mobile"></div>
                
                <div class="hero-text cssanimation">
                  <h1><span class="skew-text">{title}</span></h1>
               </div>
            </div>
    </div>
</div>
'''

for filename, title in pages:
    # Read the file
    with open(f'{filename}.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace hero section
    hero_pattern = r'(<div class="kfhomepagebanner.*?</div>\s*</div>\s*</div>\s*</div>)'
    new_hero = get_hero_template(title)
    content = re.sub(hero_pattern, new_hero, content, flags=re.DOTALL)
    
    # Find where to insert footer (before the scripts)
    # Look for </main> followed by <script src="js/clientlib-site.min.js">
    script_pattern = r'(</main>\s*<script src="js/clientlib-site\.min\.js">)'
    
    if footer:
        # Insert footer before scripts
        replacement = f'</main>\n\n{footer}\n\n<script src="js/clientlib-site.min.js">'
        content = re.sub(script_pattern, replacement, content, flags=re.DOTALL)
    
    # Write back
    with open(f'{filename}.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'Updated {filename}.html')

print('All pages updated successfully!')


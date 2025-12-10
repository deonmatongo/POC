#!/usr/bin/env python3
import re

# Read the full index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract header (up to progress bar section end)
header_match = re.search(r'(.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*<div class="progress-bar-section">.*?</div>\s*</div>\s*</div>)', content, re.DOTALL)
if not header_match:
    # Try simpler match
    header_match = re.search(r'(.*?<div class="progress-bar-section">.*?</div>\s*</div>\s*</div>)', content, re.DOTALL)

header = header_match.group(1) if header_match else content[:10000]

# Extract footer (scripts and closing tags)
footer_match = re.search(r'(<script src="js/clientlib-site\.min\.js">.*?</body></html>)', content, re.DOTALL)
footer = footer_match.group(1) if footer_match else '</body></html>'

# Pages to create
pages = [
    ('organizational-transformation', 'Organizational Transformation'),
    ('employee-engagement', 'Employee Engagement'),
    ('performance-optimization', 'Performance Optimization'),
    ('leadership-professional-development', 'Leadership & Professional Development'),
    ('customer-experience', 'Customer Experience'),
    ('data-management-insights', 'Data Management & Insights')
]

for filename, title in pages:
    # Update page title in header
    page_header = header.replace('POC | Organizational Consulting', f'POC | {title}')
    page_header = page_header.replace('page-d593169c1c', f'page-{filename}')
    page_header = page_header.replace('"pageTitle":"POC | Organizational Consulting"', f'"pageTitle":"POC | {title}"')
    
    # Create hero section
    hero = f'''
<main class="container responsivegrid noheaderContainer">
    <div class="cmp-container">
        <div class="aem-Grid aem-Grid--12 aem-Grid--default--12">
            <div class="kf_home_page_banner transparentHeader">
                <div class="banner-wrapper single-banner">
                    <div class="hero_bg" style="background-image: url(images/korn-ferry-green-texture.jpg); background-size: cover; background-position: center; min-height: 400px; position: relative;">
                        <div style="background-color: rgba(0, 0, 0, 0.5); position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
                        <div class="hero-text cssanimation" style="position: relative; z-index: 1; text-align: center; padding: 100px 20px; color: white;">
                            <h1 style="font-size: 3.5rem; font-weight: bold; margin-bottom: 20px;"><span class="skew-text">{title}</span></h1>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Content Area Placeholder -->
            <div class="containerMax" style="padding: 60px 20px; max-width: 1200px; margin: 0 auto;">
                <div class="content-area">
                    <p style="font-size: 1.2rem; line-height: 1.8; color: #333;">Content for {title} will be added here.</p>
                </div>
            </div>
        </div>
    </div>
</main>
'''
    
    # Combine everything
    full_page = page_header + hero + footer
    
    # Write to file
    with open(f'{filename}.html', 'w', encoding='utf-8') as f:
        f.write(full_page)
    
    print(f'Created {filename}.html')

print('All pages created successfully!')


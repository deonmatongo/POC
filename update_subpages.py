#!/usr/bin/env python3
import re

# Pages to update
pages = [
    ('organizational-transformation', 'Organizational Transformation'),
    ('employee-engagement', 'Employee Engagement'),
    ('performance-optimization', 'Performance Optimization'),
    ('leadership-professional-development', 'Leadership & Professional Development'),
    ('customer-experience', 'Customer Experience'),
    ('data-management-insights', 'Data Management & Insights')
]

# Hero section template matching home page style
hero_template = '''    <div class="kfhomepagebanner aem-GridColumn aem-GridColumn--default--12">


<style>
.kf_home_page_banner .hero_bg:before{
background-color: rgba(0, 0, 0, 0.5);
}
.hero-text h1 {
    font-size: 2.5rem !important;
}
@media (max-width: 768px) {
    .hero-text h1 {
        font-size: 2rem !important;
    }
}
</style>
<div class="kf_home_page_banner transparentHeader">

    <div class="banner-wrapper single-banner">
         
         
            <div class="hero_bg" style="background-image: url(images/BMT_Header_567x677.jpg); background-size: cover; background-position: center;">
                
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
    
    # Find and replace the hero section
    # Look for the main tag and replace everything until the content area
    pattern = r'(<main class="container responsivegrid noheaderContainer">.*?<div class="kf_home_page_banner transparentHeader">.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*<!-- Content Area Placeholder -->)'
    
    replacement = f'<main class="container responsivegrid noheaderContainer">\n\n    \n    <div id="container-26cdcfb8b4" class="cmp-container">\n        \n\n\n<div class="aem-Grid aem-Grid--12 aem-Grid--default--12 ">\n    \n{hero_template}\n            \n            <!-- Content Area Placeholder -->'
    
    new_content = re.sub(pattern, replacement.format(title=title), content, flags=re.DOTALL)
    
    # If pattern didn't match, try a simpler replacement
    if new_content == content:
        # Try replacing just the hero section
        pattern2 = r'(<div class="kf_home_page_banner transparentHeader">.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*<!-- Content Area Placeholder -->)'
        replacement2 = hero_template.format(title=title) + '\n            \n            <!-- Content Area Placeholder -->'
        new_content = re.sub(pattern2, replacement2, content, flags=re.DOTALL)
    
    # Write back
    with open(f'{filename}.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f'Updated {filename}.html')

print('All pages updated successfully!')


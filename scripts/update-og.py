import re

path = r'C:\Users\ara\Downloads\PROYECTOS KINDEV\MH\index.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

target_block = '''    <title>MH Contabilidad | Tu respaldo contable. Tu impulso estratégico.</title>
    <meta
      name="description"
      content="Somos MH Contabilidad, firma de servicios contables y fiscales diseñada para ser el respaldo de autónomos, pymes y medianas empresas en Ecuador."
    />

    <!-- OpenGraph para WhatsApp, Redes Sociales y Buscadores -->
    <meta property="og:site_name" content="MH Contabilidad" />
    <meta property="og:title" content="MH Contabilidad | Servicios Contables y Tributarios" />
    <meta
      property="og:description"
      content="Somos MH Contabilidad, firma de servicios contables y fiscales diseñada para ser el respaldo de autónomos, pymes y medianas empresas en Ecuador. Combinamos el máximo rigor técnico con un trato cercano y humano."
    />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_EC" />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:image:secure_url" content="/og-image.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="MH Contabilidad - Logotipo Oficial" />

    <!-- Twitter / X Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="MH Contabilidad | Servicios Contables y Tributarios" />
    <meta
      name="twitter:description"
      content="Somos MH Contabilidad, firma de servicios contables y fiscales diseñada para ser el respaldo de autónomos, pymes y medianas empresas en Ecuador."
    />
    <meta name="twitter:image" content="/og-image.png" />
    <link rel="image_src" href="/og-image.png" />'''

pattern = r'<title>.*?</title>.*?<meta\s+name=[\'\"]twitter:description[\'\"].*?/>'
new_content = re.sub(pattern, target_block, content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Updated index.html successfully!')

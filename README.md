# منصة الصف الثامن – تقنية المعلومات

## التشغيل محليًا
افتح `index.html` مباشرة في المتصفح، أو استخدم خادم بسيط:
- بايثون: `python -m http.server 8000` ثم زر: http://localhost:8000

## النشر على GitHub Pages
1) أنشئ مستودعًا جديدًا باسم أيًّا كان (مثلاً `grade8-it`).
2) ارفع كل ملفات المشروع إلى الفرع `main`.
3) من إعدادات المستودع: **Settings → Pages → Build and deployment**
   - Source: `Deploy from a branch`
   - Branch: `main` / folder: `/ (root)` ثم **Save**.
4) سيظهر رابط موقعك مثل: `https://USERNAME.github.io/REPO/`.

> إن رغبت بموقع على الجذر مباشرة: أنشئ مستودعًا باسم `USERNAME.github.io` وارفع المشروع إليه.

## هيكلة المحتوى
- `index.html`: بوابة الموقع.
- `lessons/lesson1.html`: الدرس الأول مع اختبار فوري.
- `games/`: مساحات للألعاب التعليمية.
- `model-classes/`: حصص نموذجية وخطط قابلة للتعديل.

<script>
	import { getLocale, setLocale } from '$lib/paraglide/runtime.js';

	let locale = $state(getLocale());

	const flags = { da: '🇩🇰', en: '🇬🇧' };

	function toggleLocale() {
		locale = locale === 'da' ? 'en' : 'da';
		setLocale(locale);
	}
</script>

<button
	type="button"
	onclick={toggleLocale}
	class="btn btn-circle text-xl btn-ghost"
	aria-label="Switch language between Danish and English"
>
	{flags[locale]}
</button>

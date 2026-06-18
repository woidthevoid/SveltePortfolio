<script>
	import { getLocale, setLocale } from '$lib/paraglide/runtime';

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
	class="btn btn-ghost btn-circle text-xl"
	aria-label="Switch language between Danish and English"
>
	{flags[locale]}
</button>

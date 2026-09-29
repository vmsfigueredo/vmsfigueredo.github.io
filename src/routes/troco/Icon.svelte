<script>
  /** @type {{name?: string, size?: number}} */
  let { name = 'arrow', size = 20 } = $props();
  /** @type {Record<string, string>} */
  const paths = {
    arrow: 'M4 12h16m-6-6 6 6-6 6', diagonal: 'M6 18 18 6M6 6h12v12',
    down: 'M12 4v16m-6-6 6 6 6-6', check: 'm5 12 4 4L19 6',
    globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18',
    cloud: 'M7 18a5 5 0 1 1 1-10 6 6 0 0 1 11 2 4 4 0 0 1-1 8H7',
    shield: 'm12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Zm-4 9 3 3 5-6',
    lock: 'M5 10h14v11H5zM8 10V6a4 4 0 0 1 8 0v4m-4 5v2',
    overview: 'M12 3v9h9a9 9 0 1 1-9-9Zm4 0v5h5a7 7 0 0 0-5-5Z',
    transfer: 'M4 7h16m-5-5 5 5-5 5M20 17H4m5-5-5 5 5 5',
    chart: 'M4 20V10h3v10m4 0V4h3v16m4 0v-7h3v7M2 20h21',
    wallet: 'M3 7V5a2 2 0 0 1 2-2h13v4M3 7h18v14H3V7Zm12 5h6v5h-6z',
    phone: 'M7 2h10v20H7zM10 5h4m-3 14h2', calendar: 'M4 6h16v15H4zM4 10h16M8 3v4m8-4v4',
    plus: 'M12 5v14M5 12h14', menu: 'M4 8h16M4 16h16', close: 'm6 6 12 12M6 18 18 6',
    pause: 'M9 5v14M15 5v14', play: 'm8 4 12 8-12 8V4',
    mark: 'M4 8h14l-4-4M20 16H6l4 4'
  };
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg>

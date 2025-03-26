import type { CommunityToken } from '@/schemas'

export * from './crowdin'

export const REGX_LANG_FROM_PATHNAME = /^\/([a-z]{2}(?:-[a-z]{2})?)(?:\/|$)/i

export const supportedLanguages = {
  en: 'English',
  'ja-JP': '日本語',
  'pt-PT': 'Português',
} as const

export const usageCountryCodes = [
  'JP',
  'PH',
  'US',
  'KH',
  'TW',
  'KR',
  'VN',
  'TZ',
  'NG',
  'NL',
  'GE',
  'EE',
  'SG',
  'DE',
  'FI',
  'FR',
  'PT',
  'ES',
  'IT',
  'ID',
  'MM',
  'HK',
  'MX',
  'BR',
] as const

export const tokens: CommunityToken[] = [
  { tokenAddress: 'agt', name: `Arigaton Coin` },
  { tokenAddress: 'art', name: `Get it you can` },
  { tokenAddress: 'ats', name: `Arigato-sun` },
  { tokenAddress: 'aus', name: `A.U.S coin` },
  { tokenAddress: 'bene', name: `Kinken Coin` },
  { tokenAddress: 'blu', name: `Blue Village` },
  { tokenAddress: 'bts', name: `BYTHESEA.coin` },
  { tokenAddress: 'bueno', name: `BUENO COIN` },
  { tokenAddress: 'caero', name: `CAERO COIN` },
  { tokenAddress: 'ccc', name: `chiba civil coin` },
  { tokenAddress: 'cco', name: `coconova coin` },
  { tokenAddress: 'cifco', name: `Cift coin` },
  { tokenAddress: 'clb', name: `ChigaLab Coin` },
  { tokenAddress: 'cln', name: `Cleanup & Coffee Club` },
  { tokenAddress: 'cmp', name: `COMPASS COIN` },
  { tokenAddress: 'cota', name: `Cotan Coin` },
  { tokenAddress: 'ctc', name: `CONNECTOR'S COIN` },
  { tokenAddress: 'dcoin', name: `D-COIN` },
  { tokenAddress: 'don', name: `Donguri` },
  { tokenAddress: 'eac', name: `eumo Academy COIN` },
  { tokenAddress: 'ehc', name: `EumohouseCoin` },
  { tokenAddress: 'flr', name: `Fleur COIN` },
  { tokenAddress: 'fog', name: `fog coin` },
  { tokenAddress: 'ghd', name: `GROOVE COIN` },
  { tokenAddress: 'gift', name: `gift` },
  { tokenAddress: 'goen', name: `TSUNAGI COIN` },
  { tokenAddress: 'hdc', name: `Happy Design Coin` },
  { tokenAddress: 'hero', name: `HERO COIN` },
  { tokenAddress: 'hkc', name: `HIBIKI COIN` },
  { tokenAddress: 'hly', name: `HALIYO COIN` },
  { tokenAddress: 'hnx', name: `HOMOEOPATHY NEXT COIN` },
  { tokenAddress: 'iafc', name: `IMADATE ART FIELD COIN` },
  { tokenAddress: 'ito', name: `ITO` },
  { tokenAddress: 'jir', name: `IJIRA COIN` },
  { tokenAddress: 'jura', name: `JURA COIN` },
  { tokenAddress: 'kira', name: `kiraboshi coin` },
  { tokenAddress: 'kkc', name: `KUMAGAYA COIN` },
  { tokenAddress: 'kmtr', name: `Kamo Tora Coin` },
  { tokenAddress: 'koyu', name: `KOYU COIN` },
  { tokenAddress: 'kuru', name: `KURUKURU COIN` },
  { tokenAddress: 'log', name: `LOGIN COIN` },
  { tokenAddress: 'logkyo', name: `LOGIN KYOTO` },
  { tokenAddress: 'lyl', name: `Liiily Coin` },
  { tokenAddress: 'machi', name: `machikadoCOIN` },
  { tokenAddress: 'magt', name: `Matsudo Thanks Coin` },
  { tokenAddress: 'megu', name: `Megu Coin` },
  { tokenAddress: 'mii', name: `HAGUKUMU mii` },
  { tokenAddress: 'mkg', name: `MIKAGAMI COIN` },
  { tokenAddress: 'mlc', name: `Maeda Lab COIN` },
  { tokenAddress: 'mly', name: `Maeda Lab YEN` },
  { tokenAddress: 'mori', name: `MORI COIN` },
  { tokenAddress: 'mpc', name: `MPSA COIN` },
  { tokenAddress: 'mrn', name: `MORIN COIN` },
  { tokenAddress: 'nao', name: `NAO Coin` },
  { tokenAddress: 'nata', name: `NATA COIN` },
  { tokenAddress: 'neria', name: `CARNELIAN COIN` },
  { tokenAddress: 'nesto', name: `NESTO COIN` },
  { tokenAddress: 'npr', name: `nupuri` },
  { tokenAddress: 'nwellc', name: `neutral well coin` },
  { tokenAddress: 'ocr', name: `Organic Citrus Relations` },
  { tokenAddress: 'orb', name: `Orbray COIN` },
  { tokenAddress: 'pan', name: `COMPANIA COIN` },
  { tokenAddress: 'path', name: `PATH COIN` },
  { tokenAddress: 'pce', name: `PEACE COIN` },
  { tokenAddress: 'pcel', name: `PEACE COIN（Non inc・dec）` },
  { tokenAddress: 'pcet', name: `TRIAL PEACE COIN` },
  { tokenAddress: 'ppc', name: `People Power Coin` },
  { tokenAddress: 'pri', name: `PRIMECOIN` },
  { tokenAddress: 'pwt', name: `Play week Token` },
  { tokenAddress: 'rar', name: `raracoin` },
  { tokenAddress: 'rbc', name: `RIVERBANK COIN` },
  { tokenAddress: 'sachi', name: `SACHI COIN` },
  { tokenAddress: 'sai', name: `SAIHATE COIN` },
  { tokenAddress: 'seta', name: `SETA COIN` },
  { tokenAddress: 'sgj', name: `SAGOJO Coin` },
  { tokenAddress: 'shingo', name: `SHINGO COIN` },
  { tokenAddress: 'shizen', name: `SHIZEN COIN` },
  { tokenAddress: 'sir', name: `Sirius Coin` },
  { tokenAddress: 'smc', name: `Somic Coin` },
  { tokenAddress: 'smlc', name: `Sma-LUNA COIN` },
  { tokenAddress: 'soil', name: `SOIL COIN` },
  { tokenAddress: 'somic', name: `SOMIC` },
  { tokenAddress: 'sust', name: `SusT` },
  { tokenAddress: 'ten', name: `TEN` },
  { tokenAddress: 'thanku', name: `Urayasu Thank You Coin` },
  { tokenAddress: 'thp', name: `THANKS HOP PAINT` },
  { tokenAddress: 'tkw', name: `TO-KAWA` },
  { tokenAddress: 'ton', name: `T-COIN` },
  { tokenAddress: 'trc', name: `Treasure Coin` },
  { tokenAddress: 'tree', name: `Tree Coin` },
  { tokenAddress: 'tsg', name: `TASUGURU` },
  { tokenAddress: 'uaifai', name: `UAIFAI PEACE COIN` },
  { tokenAddress: 'ucc', name: `UC COIN` },
  { tokenAddress: 'una', name: `UNA` },
  { tokenAddress: 'unc', name: `UNION COIN` },
  { tokenAddress: 'upc', name: `UP COIN` },
  { tokenAddress: 'wayco', name: `WayCo` },
  { tokenAddress: 'wel', name: `WELL COIN` },
  { tokenAddress: 'wine', name: `VILLAGE COIN` },
  { tokenAddress: 'wonder', name: `Wonder Coin` },
  { tokenAddress: 'www', name: `WARAI ZENI` },
  { tokenAddress: 'yamato', name: `YAMATO Coin` },
  { tokenAddress: 'yukko', name: `Yukko` },
  { tokenAddress: 'yuru', name: `YU-RU Coin` },
  { tokenAddress: 'yuzury', name: `YUZURY` },
]

export const tokensJp: CommunityToken[] = [
  { tokenAddress: 'agt', name: `ありがとんコイン` },
  { tokenAddress: 'art', name: `ゲイジュ通貨` },
  { tokenAddress: 'ats', name: `アリガト・サン` },
  { tokenAddress: 'aus', name: `A.U.Sコイン` },
  { tokenAddress: 'bene', name: `金研コイン` },
  { tokenAddress: 'blu', name: `ブルーヴィレッジ` },
  { tokenAddress: 'bts', name: `BYTHESEA.coin` },
  { tokenAddress: 'bueno', name: `BUENO COIN` },
  { tokenAddress: 'caero', name: `ケーロ` },
  { tokenAddress: 'ccc', name: `ちば市民コイン` },
  { tokenAddress: 'cco', name: `ココノバコイン` },
  { tokenAddress: 'cifco', name: `Ciftコイン` },
  { tokenAddress: 'clb', name: `チガラボコイン` },
  { tokenAddress: 'cln', name: `Cleanup & Coffee Club` },
  { tokenAddress: 'cmp', name: `コンパスコイン` },
  { tokenAddress: 'cota', name: `コタンコイン` },
  { tokenAddress: 'ctc', name: `コネクターズコイン` },
  { tokenAddress: 'dcoin', name: `D-コイン` },
  { tokenAddress: 'don', name: `どんぐり` },
  { tokenAddress: 'eac', name: `ユーモアカデミーコイン` },
  { tokenAddress: 'ehc', name: `ユーモハウスコイン` },
  { tokenAddress: 'flr', name: `フルールコイン` },
  { tokenAddress: 'fog', name: `フォグコイン` },
  { tokenAddress: 'ghd', name: `グルーヴコイン` },
  { tokenAddress: 'gift', name: `ギフト` },
  { tokenAddress: 'goen', name: `ツナギコイン` },
  { tokenAddress: 'hdc', name: `幸せデザインコイン` },
  { tokenAddress: 'hero', name: `HEROコイン` },
  { tokenAddress: 'hkc', name: `ひびきコイン` },
  { tokenAddress: 'hly', name: `ハリヨコイン` },
  { tokenAddress: 'hnx', name: `ホメネクコイン` },
  { tokenAddress: 'iafc', name: `イマダテ・アート・フィールド コイン` },
  { tokenAddress: 'ito', name: `い〜と` },
  { tokenAddress: 'jir', name: `いじらコイン` },
  { tokenAddress: 'jura', name: `ジュラコイン` },
  { tokenAddress: 'kira', name: `きらぼしコイン` },
  { tokenAddress: 'kkc', name: `クマガヤコイン` },
  { tokenAddress: 'kmtr', name: `カモ虎コイン` },
  { tokenAddress: 'koyu', name: `こゆコイン` },
  { tokenAddress: 'kuru', name: `くるくるコイン` },
  { tokenAddress: 'log', name: `LOGINコイン` },
  { tokenAddress: 'logkyo', name: `LOGIN京都` },
  { tokenAddress: 'lyl', name: `リリーコイン` },
  { tokenAddress: 'machi', name: `まちかどコイン` },
  { tokenAddress: 'magt', name: `松戸ありがとうコイン` },
  { tokenAddress: 'megu', name: `めぐコイン` },
  { tokenAddress: 'mii', name: `はぐくむmii` },
  { tokenAddress: 'mkg', name: `御鏡コイン` },
  { tokenAddress: 'mlc', name: `前田研コイン` },
  { tokenAddress: 'mly', name: `前田研円` },
  { tokenAddress: 'mori', name: `モリコイン` },
  { tokenAddress: 'mpc', name: `心からだコイン` },
  { tokenAddress: 'mrn', name: `モリンコイン` },
  { tokenAddress: 'nao', name: `エヌエーオーコイン` },
  { tokenAddress: 'nata', name: `なたコ` },
  { tokenAddress: 'neria', name: `カーネリアンコイン` },
  { tokenAddress: 'nesto', name: `ネストコイン` },
  { tokenAddress: 'npr', name: `ヌプリ` },
  { tokenAddress: 'nwellc', name: `neutral well coin` },
  { tokenAddress: 'ocr', name: `オーガニックシトラスリレーションズ` },
  { tokenAddress: 'orb', name: `オーブレ―コイン` },
  { tokenAddress: 'pan', name: `カンパニア コイン` },
  { tokenAddress: 'path', name: `パスコイン` },
  { tokenAddress: 'pce', name: `ピースコイン` },
  { tokenAddress: 'pcel', name: `ピースコイン（増減なし）` },
  { tokenAddress: 'pcet', name: `PEACE CON 体験コイン` },
  { tokenAddress: 'ppc', name: `ピープルパワーコイン` },
  { tokenAddress: 'pri', name: `プライムコイン` },
  { tokenAddress: 'pwt', name: `プレイウィークトークン` },
  { tokenAddress: 'rar', name: `ららこいん` },
  { tokenAddress: 'rbc', name: `RIVERBANKコイン` },
  { tokenAddress: 'sachi', name: `サチコイン` },
  { tokenAddress: 'sai', name: `サイハテコイン` },
  { tokenAddress: 'seta', name: `せたコイン` },
  { tokenAddress: 'sgj', name: `SAGOJOコイン` },
  { tokenAddress: 'shingo', name: `シンゴコイン` },
  { tokenAddress: 'shizen', name: `シゼンコイン` },
  { tokenAddress: 'sir', name: `シリウスコイン` },
  { tokenAddress: 'smc', name: `Somicコイン` },
  { tokenAddress: 'smlc', name: `スマルナコイン` },
  { tokenAddress: 'soil', name: `SOIL COIN` },
  { tokenAddress: 'somic', name: `SOMIC` },
  { tokenAddress: 'sust', name: `SusT` },
  { tokenAddress: 'ten', name: `TEN` },
  { tokenAddress: 'thanku', name: `浦安サンキューコイン` },
  { tokenAddress: 'thp', name: `サンクスホップパイント` },
  { tokenAddress: 'tkw', name: `と革` },
  { tokenAddress: 'ton', name: `T-COIN` },
  { tokenAddress: 'trc', name: `トレジャーコイン` },
  { tokenAddress: 'tree', name: `TREEコイン` },
  { tokenAddress: 'tsg', name: `たすぐる` },
  { tokenAddress: 'uaifai', name: `UAIFAI PEACE COIN` },
  { tokenAddress: 'ucc', name: `ユーシーコイン` },
  { tokenAddress: 'una', name: `UNA` },
  { tokenAddress: 'unc', name: `ゆにおんこいん` },
  { tokenAddress: 'upc', name: `アップコイン` },
  { tokenAddress: 'wayco', name: `ウェイコ` },
  { tokenAddress: 'wel', name: `WELLコイン` },
  { tokenAddress: 'wine', name: `農村コイン` },
  { tokenAddress: 'wonder', name: `ワンダーコイン` },
  { tokenAddress: 'www', name: `わらいぜに` },
  { tokenAddress: 'yamato', name: `やまとコイン` },
  { tokenAddress: 'yukko', name: `Yukko` },
  { tokenAddress: 'yuru', name: `ゆーるコイン` },
  { tokenAddress: 'yuzury', name: `ゆずり～` },
]

export const LINKS = {
  crowdin: 'https://crowdin.com/project/peace-coin',
  x: 'https://x.com/peace_coin_fund',
  facebook: 'https://www.facebook.com/PEACECOIN.PCE',
  linkdin: 'https://www.linkedin.com/company/peace-coin',
  github: 'https://github.com/peacecoin-protocol',
  discord: 'https://discord.gg/DRWPZzxzfv',
  whitePaper: 'https://assets.peace-coin.org/docs/white-paper-v2.2.pdf',
} as const

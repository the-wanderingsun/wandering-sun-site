export interface Landmark {
  type: string
  name: string
  desc: string
}

export interface TripDay {
  date: string
  day: number
  cities: string[]
  lat: number
  lng: number
  region: 'east' | 'central' | 'northwest' | 'xinjiang' | 'tibetan'
  transport: string
  stay: number
  landmarks: Landmark[]
}

export const REGION_COLORS: Record<TripDay['region'], string> = {
  east: '#3b82f6',
  central: '#f59e0b',
  northwest: '#f97316',
  xinjiang: '#8b5cf6',
  tibetan: '#10b981',
}

export const REGION_LABELS: Record<TripDay['region'], string> = {
  east: '华东',
  central: '华中',
  northwest: '西北',
  xinjiang: '新疆',
  tibetan: '青藏川',
}

export const tripData: TripDay[] = [
  {date:"8月25日",day:1,cities:["平潭"],lat:25.50,lng:119.79,region:"east",transport:"出发",stay:1,landmarks:[{type:"🌿",name:"海坛岛",desc:"福建第一大岛，海岸线曲折，礁石奇峻"},{type:"🌿",name:"龙凤头沙滩",desc:"平潭最长沙滩，日出绝佳观赏地"},{type:"🌿",name:"石牌洋",desc:"海中双石奇观，平潭标志性海景"}]},
  {date:"8月26日",day:2,cities:["义乌","东阳"],lat:29.30,lng:120.07,region:"east",transport:"平潭→义乌 自驾8h ~700km",stay:1,landmarks:[{type:"🏛️",name:"卢宅（东阳）",desc:"全国重点文保，明清古建筑群'民间故宫'"},{type:"🏛️",name:"东阳木雕博物馆",desc:"中国木雕之乡，千年木雕工艺精华"},{type:"🎭",name:"婺剧表演",desc:"浙江地方戏曲，高腔激昂，武戏精彩"}]},
  {date:"8月27日",day:3,cities:["苏州"],lat:31.30,lng:120.62,region:"east",transport:"义乌→苏州 自驾4h ~280km",stay:1,landmarks:[{type:"🏛️",name:"拙政园",desc:"中国四大名园之一，江南园林巅峰之作"},{type:"🏛️",name:"虎丘塔",desc:"'吴中第一名胜'，千年斜塔"},{type:"🏛️",name:"平江路",desc:"宋代古街，小桥流水人家"},{type:"🍜",name:"松鼠鳜鱼",desc:"苏帮菜经典，松鹤楼百年名菜"}]},
  {date:"8月28-29日",day:4,cities:["盐城"],lat:33.35,lng:120.16,region:"east",transport:"苏州→盐城 自驾4h ~300km",stay:2,landmarks:[{type:"🌿",name:"黄海森林公园",desc:"华东最大人工林，天然氧吧"},{type:"🐦",name:"条子泥湿地",desc:"世界自然遗产，候鸟迁徙重要驿站"},{type:"🐦",name:"丹顶鹤保护区",desc:"珍稀鹤类越冬地，湿地生态天堂"}]},
  {date:"8月30日",day:6,cities:["徐州"],lat:34.21,lng:117.28,region:"east",transport:"盐城→徐州 自驾4h ~350km",stay:1,landmarks:[{type:"🏛️",name:"汉文化景区",desc:"狮子山楚王陵，汉代三绝之首"},{type:"🏛️",name:"龟山汉墓",desc:"西汉楚王陵墓，工程奇迹"}]},
  {date:"8月31日-9月1日",day:7,cities:["郑州","许昌"],lat:34.75,lng:113.65,region:"central",transport:"徐州→郑州 自驾4h ~350km",stay:2,landmarks:[{type:"🏛️",name:"河南省博物院",desc:"中国八大博物馆之一，九大镇馆之宝"},{type:"🎭",name:"只有河南·戏剧幻城",desc:"21个剧场超大沉浸式戏剧城"},{type:"🏛️",name:"许昌胖东来",desc:"'中国超市天花板'，现象级商业标杆"},{type:"🍜",name:"胡辣汤",desc:"河南早餐灵魂，逍遥镇正宗"}]},
  {date:"9月2日",day:9,cities:["西安"],lat:34.27,lng:108.95,region:"northwest",transport:"郑州→西安 自驾6h ~500km",stay:2,landmarks:[{type:"🏛️",name:"秦始皇兵马俑",desc:"世界第八大奇迹，两千年前地下军团"},{type:"🏛️",name:"城墙",desc:"中国现存最完整古城墙，可骑行环游"},{type:"🏛️",name:"大雁塔",desc:"唐代佛教建筑，玄奘译经处"},{type:"🍜",name:"回民街",desc:"西安美食集散地，羊肉泡馍、肉夹馍"},{type:"🎭",name:"秦腔表演",desc:"西北最古老戏曲，慷慨激昂"}]},
  {date:"9月3日",day:10,cities:["西安"],lat:34.27,lng:108.95,region:"northwest",transport:"停留",stay:1,landmarks:[{type:"🏛️",name:"陕西历史博物馆",desc:"'古都明珠'，周秦汉唐文物宝库"},{type:"🌿",name:"华清宫",desc:"唐代皇家温泉行宫，骊山脚下"}]},
  {date:"9月4日",day:11,cities:["天水","兰州"],lat:36.06,lng:103.83,region:"northwest",transport:"西安→天水 4h；天水→兰州 4h",stay:1,landmarks:[{type:"🏛️",name:"麦积山石窟（天水）",desc:"中国四大石窟之一，泥塑艺术瑰宝"},{type:"🏛️",name:"黄河铁桥（兰州）",desc:"'天下黄河第一桥'，百年中山桥"},{type:"🍜",name:"兰州牛肉面",desc:"'一清二白三红四绿五黄'，正宗源头"}]},
  {date:"9月5日",day:12,cities:["武威"],lat:37.93,lng:102.64,region:"northwest",transport:"兰州→武威 自驾4h ~250km",stay:1,landmarks:[{type:"🏛️",name:"雷台汉墓",desc:"中国旅游标志'马踏飞燕'出土地"},{type:"🏛️",name:"武威文庙",desc:"西北最大孔庙，河西走廊文化重镇"},{type:"🏛️",name:"武威市博物馆",desc:"西夏文物集中收藏地"}]},
  {date:"9月6日",day:13,cities:["张掖"],lat:38.93,lng:100.45,region:"northwest",transport:"武威→张掖 ~200km；→马蹄寺2h",stay:1,landmarks:[{type:"🌿",name:"张掖七彩丹霞",desc:"中国最美丹霞，彩色山峦如油画"},{type:"🏛️",name:"马蹄寺",desc:"石窟悬于绝壁，藏传佛教圣地"},{type:"🏛️",name:"大佛寺",desc:"亚洲最大室内卧佛，西夏国寺"}]},
  {date:"9月7日",day:14,cities:["嘉峪关","敦煌"],lat:40.14,lng:94.66,region:"northwest",transport:"张掖→嘉峪关 午饭→敦煌 7h ~600km",stay:1,landmarks:[{type:"🏛️",name:"嘉峪关关城",desc:"'天下第一雄关'，长城西端起点"},{type:"🏛️",name:"鸣沙山月牙泉",desc:"沙漠中的千年清泉，大漠奇观"},{type:"🌿",name:"阳关遗址",desc:"'西出阳关无故人'，丝路重要关隘"}]},
  {date:"9月8-9日",day:15,cities:["敦煌"],lat:40.14,lng:94.66,region:"northwest",transport:"停留2天",stay:2,landmarks:[{type:"🏛️",name:"莫高窟",desc:"世界文化遗产，千年佛教艺术宝库"},{type:"🏛️",name:"榆林窟",desc:"莫高窟姊妹窟，精美壁画保存完好"},{type:"🌿",name:"雅丹地貌",desc:"'魔鬼城'风蚀地貌，日落震撼"},{type:"🎭",name:"沙漠露营",desc:"骑骆驼、越野摩托、星空露营"}]},
  {date:"9月10日",day:17,cities:["哈密"],lat:42.83,lng:93.51,region:"xinjiang",transport:"敦煌→哈密 自驾6h ~500km",stay:1,landmarks:[{type:"🏛️",name:"哈密回王陵",desc:"清代哈密王陵墓，伊斯兰建筑风格"},{type:"🌿",name:"巴里坤草原",desc:"天山脚下高山草原，雪山湖泊相映"},{type:"🍜",name:"哈密瓜",desc:"哈密瓜原产地，正宗甜蜜"}]},
  {date:"9月11-12日",day:18,cities:["吐鲁番"],lat:42.95,lng:89.19,region:"xinjiang",transport:"哈密→吐鲁番 自驾6h ~400km",stay:2,landmarks:[{type:"🌿",name:"火焰山",desc:"《西游记》取景地，赤红山体炽热壮观"},{type:"🌿",name:"葡萄沟",desc:"绿荫蔽日的葡萄长廊，维吾尔风情"},{type:"🏛️",name:"交河故城",desc:"世界最大最古老生土建筑城市遗址"},{type:"🏛️",name:"吐峪沟麻扎村",desc:"千年维吾尔古村，伊斯兰教圣地"},{type:"🎭",name:"沙疗",desc:"吐鲁番特色疗法，埋沙养生"}]},
  {date:"9月13日",day:20,cities:["乌鲁木齐"],lat:43.82,lng:87.62,region:"xinjiang",transport:"吐鲁番→乌鲁木齐 自驾3h ~200km",stay:1,landmarks:[{type:"🏛️",name:"新疆博物馆",desc:"楼兰美女干尸、丝路文物精华"},{type:"🎭",name:"国际大巴扎",desc:"世界规模最大巴扎，异域风情浓烈"},{type:"🌿",name:"天山天池",desc:"博格达峰下高山湖泊，神话瑶池"}]},
  {date:"9月14日",day:21,cities:["阿勒泰"],lat:47.85,lng:88.14,region:"xinjiang",transport:"乌鲁木齐→阿勒泰 S21沙漠公路 6h ~500km",stay:1,landmarks:[{type:"🌿",name:"乌伦古湖",desc:"银沙滩金色湖岸，沙漠中的海"},{type:"🌿",name:"将军山",desc:"城市滑雪场，缆车俯瞰阿勒泰全景"}]},
  {date:"9月15日",day:22,cities:["禾木","贾登峪"],lat:48.63,lng:87.04,region:"xinjiang",transport:"阿禾公路 6-8h慢开 ~250km",stay:1,landmarks:[{type:"🌿",name:"禾木村",desc:"图瓦人村落，晨雾炊烟如仙境"},{type:"🌿",name:"喀纳斯湖",desc:"高山湖泊，'人间仙境'，变色湖面"},{type:"🌿",name:"阿禾公路",desc:"最美自驾公路，草原雪山河流"}]},
  {date:"9月16-17日",day:23,cities:["白哈巴","那仁夏牧场"],lat:48.30,lng:86.70,region:"xinjiang",transport:"铁贾公路 4-6h慢开 ~100km",stay:2,landmarks:[{type:"🌿",name:"白哈巴村",desc:"'西北第一村'，中哈边境童话木屋"},{type:"🌿",name:"那仁夏牧场",desc:"高山草甸牧场，雪山花海牛羊成群"},{type:"🌿",name:"铁贾公路",desc:"原始森林峡谷公路，沿途野餐"}]},
  {date:"9月18日",day:25,cities:["布尔津","克拉玛依"],lat:45.59,lng:84.87,region:"xinjiang",transport:"白哈巴→布尔津→克拉玛依 ~400km",stay:1,landmarks:[{type:"🌿",name:"五彩滩",desc:"雅丹地貌彩色河岸，额尔齐斯河畔"},{type:"🏜️",name:"乌尔禾魔鬼城",desc:"风蚀雅丹地貌，戈壁日落壮观"},{type:"🌿",name:"胡杨林",desc:"额尔齐斯河畔金色胡杨，秋日绝景"}]},
  {date:"9月19日",day:26,cities:["乌苏","奎屯"],lat:44.42,lng:84.90,region:"xinjiang",transport:"克拉玛依→乌苏 3h ~250km",stay:1,landmarks:[{type:"🎭",name:"乌苏啤酒小镇",desc:"'夺命大乌苏'产地，啤酒文化体验"},{type:"🌿",name:"独山子大峡谷",desc:"天山雪水冲蚀千万年的壮观峡谷"}]},
  {date:"9月20-21日",day:27,cities:["唐布拉","孟克特"],lat:43.50,lng:84.20,region:"xinjiang",transport:"独库公路→唐布拉 ~250km",stay:2,landmarks:[{type:"🌿",name:"独库公路",desc:"'中国最美公路'，纵贯天山四季景观"},{type:"🌿",name:"唐布拉百里画廊",desc:"草原河流雪山长卷，如行画中"},{type:"🌿",name:"孟克特景区",desc:"温泉峡谷古道，可自驾野餐"}]},
  {date:"9月22日",day:29,cities:["库车"],lat:41.72,lng:82.96,region:"xinjiang",transport:"唐布拉→独库公路→库车 8h ~400km",stay:1,landmarks:[{type:"🏛️",name:"龟兹博物馆",desc:"龟兹古国文明，佛教东传第一站"},{type:"🌿",name:"库车大峡谷",desc:"红褐色山体峡谷，光影奇幻"},{type:"🏛️",name:"龟兹石窟遗址",desc:"比莫高窟更早的佛教石窟艺术"}]},
  {date:"9月23日",day:30,cities:["库尔勒"],lat:41.76,lng:86.15,region:"xinjiang",transport:"库车→库尔勒 自驾4h ~300km",stay:1,landmarks:[{type:"🏛️",name:"巴州博物馆",desc:"楼兰古城、罗布泊文物集中展示"},{type:"🏛️",name:"铁门关",desc:"古代丝路要隘，孔雀河峡谷"}]},
  {date:"9月24日",day:31,cities:["若羌"],lat:39.02,lng:88.17,region:"northwest",transport:"库尔勒→若羌 自驾5h ~400km",stay:1,landmarks:[{type:"🏛️",name:"楼兰古城遗址",desc:"消失的丝路古国，'东方庞贝'"},{type:"🏜️",name:"罗布泊",desc:"'死亡之海'，神秘无人区"}]},
  {date:"9月25-26日",day:32,cities:["茫崖","格尔木"],lat:36.41,lng:94.91,region:"tibetan",transport:"若羌→茫崖 5h；茫崖→格尔木 ~500km",stay:2,landmarks:[{type:"🌿",name:"茫崖翡翠湖",desc:"戈壁中的绿色盐湖，如宝石镶嵌"},{type:"🌿",name:"水上雅丹",desc:"世界唯一水上雅丹群，鸭湖奇观"},{type:"🌿",name:"东台吉乃尔湖",desc:"蒂芙尼蓝盐湖，西北最美湖泊"},{type:"🌿",name:"察尔汗盐湖",desc:"中国最大盐湖，万丈盐桥奇观"}]},
  {date:"9月27日",day:34,cities:["玛沁"],lat:34.47,lng:100.24,region:"tibetan",transport:"格尔木→玛沁 自驾7h ~500km",stay:1,landmarks:[{type:"🌿",name:"阿尼玛卿雪山",desc:"藏区四大神山之一，冰川雄伟"},{type:"🌿",name:"昆仑山口",desc:"'万山之祖'，青藏高原门户"}]},
  {date:"9月28日",day:35,cities:["青神"],lat:29.83,lng:103.80,region:"tibetan",transport:"玛沁→青神 自驾12h ~800km",stay:1,landmarks:[{type:"🌿",name:"中岩寺",desc:"苏东坡读书处，唐代摩崖造像"},{type:"🌿",name:"岷江竹编",desc:"青神竹编非遗，精细如丝"}]},
  {date:"9月29日-10月1日",day:36,cities:["青神"],lat:29.83,lng:103.80,region:"tibetan",transport:"休整3天",stay:3,landmarks:[{type:"🌿",name:"湿地公园",desc:"岷江湿地生态，白鹭飞舞"},{type:"🎭",name:"鱼塘垂钓",desc:"乡村休闲，田园慢生活"}]},
  {date:"10月2日",day:39,cities:["乐山"],lat:29.55,lng:103.77,region:"tibetan",transport:"青神→乐山 1.5h ~80km",stay:1,landmarks:[{type:"🏛️",name:"乐山大佛",desc:"世界最大石刻弥勒佛坐像，唐代凿造"},{type:"🌿",name:"峨眉山",desc:"佛教四大名山之一，云海日出金顶"},{type:"🍜",name:"乐山美食",desc:"钵钵鸡、甜皮鸭、豆腐脑、翘脚牛肉"}]},
  {date:"10月3日",day:40,cities:["青神"],lat:29.83,lng:103.80,region:"tibetan",transport:"乐山→青神 1.5h ~80km 行程结束",stay:1,landmarks:[{type:"🎭",name:"行程圆满",desc:"40天环游中国，跨越万里归来"}]},
]

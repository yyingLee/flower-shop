// 检查登录状态
	function checkLogin() {
		const username = localStorage.getItem('currentUser');
		if (!username) {
			window.location.href = 'login.html';
		}
		document.getElementById('username').textContent = username;
	}
	// 首页点击退出登录按钮
	function logout() {
		localStorage.removeItem('currentUser');
		window.location.href = 'login.html';
	}
	// 页面加载时检查登录状态
	checkLogin();



	// 搜索功能
	document.getElementById('searchInput').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();
    const productCards = document.querySelectorAll('.product-card');
    
	// 如果搜索词为空，则显示所有商品，并移除高亮（通过将innerHTML设置为textContent）
    if (query === '') {
        // 显示所有商品
        productCards.forEach(card => {
            card.style.display = 'block';
            // 移除高亮
            const nameElement = card.querySelector('.product-name');
            const descElement = card.querySelector('.product-desc');
            nameElement.innerHTML = nameElement.textContent;
            descElement.innerHTML = descElement.textContent;
        });
        return;
    }
    
    let hasResults = false;
    
    productCards.forEach(card => {
        const name = card.querySelector('.product-name').textContent.toLowerCase();
        const desc = card.querySelector('.product-desc').textContent.toLowerCase();
        
        if (name.includes(query) || desc.includes(query)) {
            card.style.display = 'block'; // 显示匹配的商品
            hasResults = true;
            
            // 高亮显示
            const nameElement = card.querySelector('.product-name');
            const descElement = card.querySelector('.product-desc');
            
            // 转义正则表达式的特殊字符
            const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedQuery})`, 'gi');
            
			// 关键词高亮：在商品名称中高亮显示搜索关键词
			// 作用：将纯文本商品名称中匹配搜索词的部分用<mark>标签包裹，实现高亮效果
            nameElement.innerHTML = nameElement.textContent.replace(regex, '<mark>$1</mark>');
            descElement.innerHTML = descElement.textContent.replace(regex, '<mark>$1</mark>');
        } else {
            card.style.display = 'none';  // 隐藏不匹配的商品
        }
    });

	// 如果没有结果，显示提示
    const noResultsDiv = document.getElementById('noResults');
    if (!hasResults) {
        if (!noResultsDiv) {
            const container = document.getElementById('productList');
            const div = document.createElement('div');
            div.id = 'noResults';
            div.className = 'no-results';
            div.textContent = '没有找到相关商品';
            container.appendChild(div);
        }
	}   else if (noResultsDiv) {
			noResultsDiv.remove();
		}
	});

	// 轮播图功能
	document.addEventListener('DOMContentLoaded', function() {
		// 获取轮播图元素
		 // carousel-slides: 包含所有幻灯片的容器（用于平移）
		const carouselSlides = document.querySelector('.carousel-slides');
		const slides = document.querySelectorAll('.slide');
		const indicators = document.querySelectorAll('.indicator');
		
		// 当前激活的幻灯片索引：记录当前显示的是第几张幻灯片，初始值为0（第一张）
		let currentIndex = 0;
		// 自动轮播的定时器ID：用于存储setInterval返回的定时器标识，后续可以通过这个ID停止自动轮播
		let slideInterval;
		// 幻灯片的总数量：获取slides集合的长度，即轮播图的总张数，用于实现循环切换
		const slideCount = slides.length;
		
		// 更新轮播图位置
		function updateCarousel() {
			// 效果：向左移动index*100%的宽度，显示第index+1张图片
			// 例如：currentIndex=1时，平移-100%，显示第二张幻灯片；currentIndex=2时，平移-200%，显示第三张
			carouselSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
			
			// 更新活动状态
			// 遍历所有幻灯片，给当前索引的幻灯片添加active类，移除其他幻灯片的active类
			slides.forEach((slide, index) => {
				slide.classList.toggle('active', index === currentIndex);
			});
			
			// 遍历所有指示器，给当前索引的指示器添加active类，移除其他指示器的active类（实现小圆点高亮）
			indicators.forEach((indicator, index) => {
				indicator.classList.toggle('active', index === currentIndex);
			});
		}
		
		// 下一张
		function nextSlide() {
			// 使用取模运算实现无限循环：
        	// 当currentIndex=3（最后一张），slideCount=4时
        	// (3 + 1) % 4 = 0，回到第一张
			currentIndex = (currentIndex + 1) % slideCount;
			updateCarousel();
		}
		
		// 上一张
		function prevSlide() {
			// 当currentIndex=0（第一张），slideCount=4时
        	// (0 - 1 + 4) % 4 = 3，跳到最后一张
			currentIndex = (currentIndex - 1 + slideCount) % slideCount;
			updateCarousel();
		}
		
		// 跳转到指定幻灯片
		// 点击小圆点时，将小圆点的下标传入goToSlide，赋值给currentIndex，
		// 再通过updateCarousel根据currentIndex匹配对应的幻灯片和小圆点。
		function goToSlide(index) {
			// 直接设置当前索引
			currentIndex = index;

			// 调用更新函数，刷新轮播图显示
			updateCarousel();
		}
		
		// 开始自动轮播
		function startAutoSlide() {
			stopAutoSlide();
			slideInterval = setInterval(nextSlide, 3000); // 3秒切换一次
		}
		
		// 停止自动轮播
		function stopAutoSlide() {
			if (slideInterval) {
				clearInterval(slideInterval);
			}
		}
		
		// 为每个指示器（小圆点）添加点击事件
		indicators.forEach((indicator, index) => {
			indicator.addEventListener('click', () => {
				// 点击指示器时跳转到对应的幻灯片
				goToSlide(index);
				startAutoSlide(); // 重新开始自动轮播
			});
		});
		
		// 初始化自动轮播
		startAutoSlide();
	});



	// 商品数据
	let products = [
	    {
	       id: '1',
	       name: '红玫瑰经典款',
	       price: 199,
	       desc: '精选12支红玫瑰，象征热烈爱情 | 花语：热恋 | 养护：每日换水，避免阳光直射',
	       image: './images/rose.jpg',
			categories: ['玫瑰', '红色', '节日花束', '婚礼花束'],
			stock: 999 // 模拟库存
	    },
	    {
	        id: '2',
	        name: '白百合清香款',
	        price: 299,
	        desc: '5支纯白百合 | 花语：纯洁高雅 | 养护：去除花粉可延长花期',
	        image: './images/lily.jpg',
	         categories: ['百合', '白色', '节日花束'],
			 stock: 999 // 模拟库存
	    },
	    {
	        id: '3',
	        name: '香槟玫瑰礼盒',
	        price: 399,
	        desc: '24支香槟色玫瑰 | 花语：只钟情你一人 | 养护：斜剪根茎，使用保鲜剂',
	        image: './images/xb.jpg',
	        categories: ['玫瑰', '粉色', '生日花束', '婚礼花束'],
			stock: 999 // 模拟库存
	    },
	    {
	        id: '4',
	        name: '小苍兰混搭花束',
	        price: 259,
	        desc: '小苍兰+满天星组合 | 花语：纯洁幸福 | 养护：保持水质清洁',
	        image: './images/freesia.jpg',
	        categories: ['小苍兰', '白色', '节日花束'],
			stock: 999 // 模拟库存
	    },
	    {
	        id: '5',
	        name: '粉蔷薇花篮',
	        price: 359,
	        desc: '新鲜粉蔷薇+尤加利叶 | 花语：爱的誓言 | 养护：每日喷水保湿',
	        image: './images/fqw.jpg',
	        categories: ['蔷薇', '粉色', '婚礼花束'],
			stock: 999 // 模拟库存
	    },
	    {
	        id: '6',
	        name: '双色月季盆栽',
	        price: 199,
	        desc: '红白双色月季 | 花语：青春气息 | 养护：保持土壤湿润',
	        image: './images/yj.jpg',
	        categories: ['红色', '白色'],
			stock: 999 // 模拟库存
	    },
	    {
	        id: '7',
	        name: '栀子花礼盒',
	        price: 299,
	        desc: '栀子花+绿叶配材 | 花语：永恒的爱 | 养护：避免高温环境',
	        image: './images/zzh.jpg',
	        categories: [ '白色', '节日花束'],
			stock: 999 // 模拟库存
	    },
		{
		    id: '8',
		    name: '向日葵花束',
		    price: 239,
		    desc: '5支向日葵+绿叶配材 | 花语：阳光灿烂 | 养护：每日换水',
		    image: './images/xrk.jpg',
		    categories: ['向日葵', '黄色', '生日花束'],
			stock: 999 // 模拟库存
		},
		{
		    id: '9',
		    name: '满天星花束',
		    price: 189,
		    desc: '蓝色满天星 | 花语：思念 | 养护：可制作干花',
		    image: './images/mtx.jpg',
		     categories: ['蓝色', '节日花束'],
			 stock: 999 // 模拟库存
		},
		{
		    id: '10',
		    name: '蝴蝶兰盆栽',
		    price: 499,
		    desc: '白色蝴蝶兰 | 花语：幸福向你飞来 | 养护：喜阴怕晒',
		    image: './images/hdl.jpg',
		    categories: ['白色', '节日花束'],
			stock: 999 // 模拟库存
		},
		{
		    id: '11',
		    name: '波斯菊花束',
		    price: 219,
		    desc: '七彩波斯菊 | 花语：纯洁的美 | 养护：保持水质清洁',
		    image: './images/bsj.jpeg',
		    categories: ['彩色', '节日花束'],
			stock: 999 // 模拟库存
		},
		{
		    id: '12',
		    name: '菊花花篮',
		    price: 279,
		    desc: '黄白菊花组合 | 花语：哀思 | 养护：避免阳光直射',
		    image: './images/jh.jpg',
		    categories: ['菊花', '黄色', '白色'],
			stock: 999 // 模拟库存
		},
		{
		    id: '13',
		    name: '郁金香花束',
		    price: 349,
		    desc: '10支粉色郁金香 | 花语：永恒的爱 | 养护：低温环境',
		    image: './images/yjx.jpg',
		    categories: [ '粉色', '婚礼花束'],
			stock: 999 // 模拟库存
		},
		{
		    id: '14',
		    name: '洋牡丹花束',
		    price: 289,
		    desc: '5支洋牡丹 | 花语：富贵吉祥 | 养护：每日换水',
		    image: './images/rose.jpg',
		    categories: ['洋牡丹', '粉色', '节日花束'],
			stock: 999 // 模拟库存
		},
		{
		    id: '15',
		    name: '康乃馨礼盒',
		    price: 259,
		    desc: '12支粉色康乃馨 | 花语：母爱 | 养护：斜剪根茎',
		    image: './images/knx.jpg',
	        categories: [ '粉色', '节日花束'],
			stock: 999 // 模拟库存
		},
	    {
	        id: '16',
	        name: '洋桔梗花束',
	        price: 329,
	        desc: '紫色洋桔梗 | 花语：真诚不变的爱 | 养护：每日换水',
	        image: './images/yjg.jpeg',
	        categories: [ '紫色', '婚礼花束'],
			stock: 999 // 模拟库存
	    },
		{
		   id: '17',
		   name: '紫罗兰花束',
		   price: 269,
		    desc: '蓝色紫罗兰 | 花语：永恒的美 | 养护：保持水质清洁',
		    image: './images/zll.jpg',
	        categories: [ '蓝色', '节日花束'],
			stock: 999 // 模拟库存
		},
		{
		   id: '18',
		   name: '非洲菊花篮',
		   price: 299,
		    desc: '多彩非洲菊 | 花语：快乐 | 养护：每日换水',
		    image: './images/fzj.jpg',
	        categories: [ '彩色', '生日花束'],
			stock: 999 // 模拟库存
		},
		{
		  id: '19',
		  name: '芍药花束',
		  price: 459,
		    desc: '粉色芍药 | 花语：美丽动人 | 养护：避免阳光直射',
		    image: './images/sy.jpg',
	        categories: [ '粉色', '婚礼花束'],
			stock: 999 // 模拟库存
		},
		{
		  id: '20',
		  name: '铃兰花束',
		  price: 399,
		    desc: '白色铃兰 | 花语：幸福归来 | 养护：低温环境',
		    image: './images/ll.jpg',
	        categories: [ '白色', '婚礼花束'],
			stock: 999 // 模拟库存
		},
	];

	// 购物车相关功能
	// 使用LocalStorage持久化存储购物车数据
	// 读取购物车数据
	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	
	// 订单数据
	let orders = JSON.parse(localStorage.getItem('orders')) || [];
	
	// 地址数据
	let addresses = JSON.parse(localStorage.getItem('addresses')) || [];


	// 初始化商品
	function initProducts() {
		const container = document.getElementById('productList');
		container.innerHTML = '';
		products.forEach(product => {
			const productCard = document.createElement('div');
			productCard.className = 'product-card';

    productCard.innerHTML = `
    
       <img class="product-img" src="${product.image}" alt="${product.name}">
       <div style="padding: 10px;">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.desc}</p>
        <div class="product-price">
          <span>￥${product.price.toFixed(2)}</span>
          <span class="stock-info">库存: ${product.stock}</span> <!-- 添加库存显示 -->
          <button onclick="addToCart('${product.id}')">💐 加入购物车</button>
        </div>
      </div>
    `;

    container.appendChild(productCard);
  });
}

	// 添加到购物车
	function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
	// 如果有同样的商品，这里会找到它，然后只需要增加数量即可
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showToast(`${product.name} 已添加到购物车`);
}

	// 更新购物车状态
	function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

	// 渲染购物车商品
	function renderCartItems() {
		const container = document.getElementById('cartItems');
		const totalElement = document.getElementById('cartTotal');
		
		container.innerHTML = '';
		
		let total = 0;
		
		if (cart.length === 0) {
			container.innerHTML = '<p style="text-align: center; padding: 20px;">购物车是空的</p>';
			totalElement.textContent = '0.00';
			return;
		}
		
		cart.forEach(item => {
			// 购物车总价
			const itemTotal = item.price * item.quantity;
			total += itemTotal;
			
			const itemElement = document.createElement('div');
			itemElement.className = 'cart-item';
			itemElement.innerHTML = `
				<img src="${item.image}" alt="${item.name}">
				<div class="item-info">
					<h4 class="item-name">${item.name}</h4>
					<p class="item-price">单价: ￥${item.price.toFixed(2)}</p>
				</div>
				<div class="quantity-control">
					<button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
					<input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', 0, this.value)">
					<button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
					<button class="remove-btn" onclick="removeFromCart('${item.id}')">×</button>
				</div>
			`;
			
			container.appendChild(itemElement);
		});
		// 将计算得到的数值（比如购物车总价total）保留两位小数，
		// 并把这个格式化后的字符串显示在页面的指定元素中
		totalElement.textContent = total.toFixed(2);
	}

	// 更新商品数量
	function updateQuantity(productId, delta, newValue) {
		const item = cart.find(item => item.id === productId);
		if (!item) return;
		
		// 分两种情况更新商品数量
    	// 情况一：newValue有值（说明是手动输入新数量，比如输入框输入数字）
		if (newValue !== undefined) {
			 // 将输入的新值转换为10进制整数
			const quantity = parseInt(newValue, 10);

			// 处理异常情况：如果转换后是NaN（非数字）或数量小于1，就设为1；否则用转换后的值
			item.quantity = isNaN(quantity) || quantity < 1 ? 1 : quantity;
		} else {

			// 情况二：newValue无值（说明是点击+/-按钮，通过delta增量更新）
        	// delta：增量，+1表示加，-1表示减
			item.quantity += delta;

			// 确保数量不会小于1（比如当前数量是1，点击减号后仍保持1）
			if (item.quantity < 1) item.quantity = 1;
		}
		// 更新本地存储
    	localStorage.setItem('cart', JSON.stringify(cart));
    
    	// 重要：重新渲染购物车以更新总价
		if (document.getElementById('cartModal').classList.contains('active')) {
			renderCartItems(); // 这会重新计算总价
		}
		
		updateCart();
	}

	// 从购物车移除商品
	function removeFromCart(productId) {
		cart = cart.filter(item => item.id !== productId);
		// 重要：重新渲染购物车
		if (document.getElementById('cartModal').classList.contains('active')) {
        renderCartItems();
    	}
		updateCart();
	}


	// 显示/隐藏购物车
	// * 功能：当点击购物车图标时，如果购物车是隐藏的就显示，如果显示的就隐藏
	function toggleCart() {
		// 1. 获取购物车模态框元素
		// 2. 切换'active'类的状态
    	// classList.toggle('active')方法的作用：
    	//   - 如果元素有'active'类，就移除它
    	//   - 如果元素没有'active'类，就添加它
		document.getElementById('cartModal').classList.toggle('active');
		// 3. 如果切换后模态框处于激活（显示）状态
    	// 检查模态框是否包含'active'类
		if (document.getElementById('cartModal').classList.contains('active')) {
			// 渲染购物车商品列表
			renderCartItems();
		}
	}

	// 显示支付弹窗
	function showPayment() {
		if (cart.length === 0) {
			showToast('购物车是空的，请先添加商品');
			return;
		}
		
		if (addresses.length === 0) {
			showToast('请先填写配送地址');
			showAddress();
			return;
		}
		
		document.getElementById('cartModal').classList.remove('active');
		const order = {
			// 生成唯一订单ID：使用当前时间戳作为ID
			id: Date.now().toString(),
			// 订单创建时间：格式化为本地时间字符串
			date: new Date().toLocaleString(),
			// 订单商品列表：复制当前购物车中的所有商品
        // 使用扩展运算符[...cart]创建购物车数组的浅拷贝，避免引用问题
			items: [...cart],
			total: document.getElementById('cartTotal').textContent,
			address: addresses[0],
			// status: 'paid' // paid, shipping, delivered
		};
		
		orders.unshift(order);
		localStorage.setItem('orders', JSON.stringify(orders));
		
		// 清空购物车
		cart = [];
		updateCart();
		
		showToast('支付成功！订单已创建');

		// 显示订单
		showOrders();
		
		
	}


	// 显示订单
	function showOrders() {
		document.getElementById('ordersModal').classList.add('active');
		renderOrders();
	}

	// 隐藏订单
	function hideOrders() {
		document.getElementById('ordersModal').classList.remove('active');
	}

	// 渲染订单
	function renderOrders() {
		const container = document.getElementById('ordersList');
		container.innerHTML = '';
		
		if (orders.length === 0) {
			container.innerHTML = '<p style="text-align: center; padding: 20px;">暂无订单</p>';
			return;
		}
		
		orders.forEach(order => {
			const orderDiv = document.createElement('div');
			orderDiv.className = 'order-item';
			orderDiv.innerHTML = `
				<div style="width: 100%; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
					<p style="margin: 5px 0; font-weight: bold;">订单号: ${order.id}</p>
					<p style="margin: 5px 0; color: #666;">下单时间: ${order.date}</p>
					<p style="margin: 5px 0; color: #666;">配送地址: ${order.address.recipient} ${order.address.phone} ${order.address.address}</p>
					<p style="margin: 5px 0; font-weight: bold; color: var(--primary);">总价: ￥${order.total}</p>
				</div>
			`;
			
			order.items.forEach(item => {
				const itemDiv = document.createElement('div');
				itemDiv.className = 'order-item';
				itemDiv.innerHTML = `
					<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
					<div class="item-info">
						<h4 class="item-name" style="margin: 0;">${item.name}</h4>
						<p class="item-price" style="margin: 5px 0;">单价: ￥${item.price.toFixed(2)}</p>
						<p style="margin: 5px 0;">数量: ${item.quantity}</p>
					</div>
				`;
				orderDiv.appendChild(itemDiv);
			});
			
			// 添加订单状态
			const statusDiv = document.createElement('div');
			statusDiv.style.margin = '15px 0';
			orderDiv.appendChild(statusDiv);
			container.appendChild(orderDiv);
		});
	}

	// 显示地址弹窗
	function showAddress() {
		document.getElementById('addressModal').classList.add('active');
		
		// 如果有保存的地址，填充表单
		if (addresses.length > 0) {
			document.getElementById('recipient').value = addresses[0].recipient || '';
			document.getElementById('phone').value = addresses[0].phone || '';
			document.getElementById('address').value = addresses[0].address || '';
		}
	}

	// 隐藏地址弹窗
	function hideAddress() {
		document.getElementById('addressModal').classList.remove('active');
	}

	// 保存地址
	function saveAddress() {
		const recipient = document.getElementById('recipient').value.trim();
		const phone = document.getElementById('phone').value.trim();
		const address = document.getElementById('address').value.trim();
		
		if (!recipient || !phone || !address) {
			showToast('请填写完整的地址信息');
			return;
		}
		
		const newAddress = { recipient, phone, address };
		addresses = [newAddress]; // 只保存一个地址
		localStorage.setItem('addresses', JSON.stringify(addresses));
		
		hideAddress();
		showToast('地址保存成功');
	}


	// 显示提示信息
	function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0,0,0,0.7)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    toast.style.animation = 'fadeInOut 3s';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

	
	// 页面加载时初始化
	window.onload = function() {
		checkLogin();
		initProducts();
		};
		

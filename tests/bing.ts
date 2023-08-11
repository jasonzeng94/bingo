const main = async () => {
	fetch('http://127.0.0.1:3000/api/create', {
		headers: {
			fullcookie:"aaa=123213; a=b; c=c",
			accept: '*/*',
			'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
			'x-ms-useragent': 'azsdk-js-api-client-factory/1.0.0-beta.1 core-rest-pipeline/1.10.0 OS/Win32',
		},
		referrer: 'http://127.0.0.1:3000/',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: null,
		method: 'POST',
		mode: 'cors',
		credentials: 'omit',
	})
		.then((rsp) => rsp.json())
		.then(({ conversationId, conversationSignature, clientId }) => {
            console.log("conversationId: ",conversationId)
			return fetch('http://127.0.0.1:3000/api/sydney', {
				headers: {
					accept: '*/*',
					'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
					'content-type': 'application/json',
				},
				referrer: 'http://127.0.0.1:3000/',
				referrerPolicy: 'strict-origin-when-cross-origin',
				body: JSON.stringify({
					conversationId,
					conversationSignature,
					clientId,
					invocationId: 0,
					conversationStyle: 'Creative',
                    previousMessages:[
                        {
                            text:"今天成都天气",
                            author:"user"
                        }
                    ],
					prompt: '',
				}),
				method: 'POST',
				mode: 'cors',
				credentials: 'omit',
			});
		})
		.then((rsp) => rsp.text())
		.then(async (data) => {
			console.log(JSON.stringify(data))
		})
		.catch((err) => {
			console.error('err: ', err);
		});
};

main();

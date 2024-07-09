const YeeDiscovery = require('yeelight-platform').Discovery
const YeeDevice = require('yeelight-platform').Device
const discoveryService = new YeeDiscovery()

discoveryService.on('started', () => {
    console.log('** Discovery Started **')
})

discoveryService.on('didDiscoverDevice', (device) => {
    console.log(device)
})

discoveryService.listen()

const devices = [
    { host: "192.168.1.100", port: 55443, color: 255 },
    { host: "192.168.1.103", port: 55443, color: 65280 },
    { host: "192.168.1.102", port: 55443, color: 16711680 }
]

devices.forEach(deviceInfo => {
    const device = new YeeDevice(deviceInfo)

    device.connect()

    device.on('deviceUpdate', (newProps) => {
        //console.log(newProps)
    })

    device.on('connected', () => {
        const flowParams = [
            200, 1, deviceInfo.color, 100,
            200, 1, deviceInfo.color, 1
        ]

        const flowExpression = flowParams.join(',')

        device.sendCommand({
            id: 1,
            method: 'start_cf',
            params: [0, 0, flowExpression]
        })
    })
})

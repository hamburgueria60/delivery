export default function run(SocketService, NotificationService, amMoment, SystemVersion, ApplicationService) {
  SocketService.initialize()
  NotificationService.initialize()
  amMoment.changeLocale('pt-br')

  SystemVersion.getSystemVersion().$promise.then(data => {
    ApplicationService.setVersion(data.version)
  })
}

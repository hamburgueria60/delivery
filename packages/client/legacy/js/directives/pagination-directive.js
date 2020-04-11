;(function() {
  angular
    .module('app')
    .directive('pagination', ContainerDirective)
    .directive('paginationControl', ControlDirective)
    .directive('paginationSource', PaginationSourceDirective)

  function PaginationSourceDirective() {
    const ddo = {}
    ddo.scope = { paginationSource: '=' }
    ddo.controller = function PaginationSourceController($scope) {
      const controller = this
      $scope.$watch(
        function() {
          return $scope.paginationSource && $scope.paginationSource.$resolved
        },
        function() {
          controller.source = $scope.paginationSource
          controller.resolved = $scope.paginationSource && $scope.paginationSource.$resolved
        },
      )
    }
    ddo.restrict = 'A'
    return ddo
  }

  function ContainerDirective($state) {
    const DEFAULT_NUMBER_OF_ELEMENTS = 7
    const ddo = {}
    let isWatching = false
    ddo.require = '^paginationSource'
    ddo.transclude = true
    ddo.templateUrl = '/views/components/pagination/container.html'
    ddo.link = function(scope, element, attrs, ctrl) {
      scope.$pagination = {
        limit: DEFAULT_NUMBER_OF_ELEMENTS, // Valor inicial
        tabs: [],
        skip: 0,
        current: 1,
        numberOfPages: null,
        next() {
          const page = parseInt(scope.$pagination.current) + 1
          this.go(page)
        },
        previous() {
          const page = parseInt(scope.$pagination.current) - 1
          this.go(page)
        },
        go(page) {
          page = parseInt(page)
          if (page < 1 || page > scope.$pagination.numberOfPages) {
            page !== 1 ? this.go(1) : angular.noop()
            throw new Error(`Invalid page number. Must be bettween 1 and ${scope.$pagination.numberOfPages}`)
          }
          scope.$pagination.current = page
          $state.go($state.current.name, { page })
        },
        getTabs() {
          const fixedNumberOfTabs = DEFAULT_NUMBER_OF_ELEMENTS
          const curr = parseInt(this.current)
          let arr = []
          const total = Math.max(fixedNumberOfTabs, this.numberOfPages)
          const max = Math.min(fixedNumberOfTabs, total)

          for (let i = 1; i <= Math.min(total, this.numberOfPages); i++) arr.push(i)

          // Valores padrão: antes de antigir o centro do contador
          let mStart = 0
          let mEnd = max - 1
          const m = Math.ceil(max / 2)

          // Após atingir o centro do contador
          if (curr >= m) {
            // Caso a centralização do contador exceda o limite superior
            if (mEnd + curr - m < total) {
              // Equilíbrio total
              mStart += curr - m
              mEnd += curr - m
            } else {
              // Contingência para o equilíbrio
              mEnd = total
              mStart = total - max
            }
          }

          arr = arr.slice(mStart, mEnd + 1)

          return arr
        },
        isBackDisabled() {
          return !ctrl.resolved || scope.$pagination.current == 1
        },
        isForwardDisabled() {
          return !ctrl.resolved || scope.$pagination.current == scope.$pagination.numberOfPages
        },
      }

      // Inspeção contínua sob a disponibilidade dos dados, promise$q
      scope.$watch(
        function() {
          return ctrl.resolved
        },
        function(resolved) {
          if (resolved) {
            render()
          }
        },
      )

      function render() {
        // TODO Caso se mostre necessário, atualizar as dimensões de acordo com o tamanho da view

        // Recuperar a paágina solicitada
        scope.$pagination.current = $state.params.page || 1

        const container = $(element).closest('#main-view')
        const header = $(element).find('tr:first-child')
        const row = $(element).find('tr[ng-repeat]')
        const control = $(element).find('pagination-control')

        const availableSpace = container.outerHeight(true) - control.outerHeight(true)
        let sizeOfEachRow = (availableSpace - header.outerHeight(true)) / row.outerHeight(true)
        sizeOfEachRow = Math.floor(sizeOfEachRow)
        sizeOfEachRow -= 2

        if (!isWatching) {
          isWatching = true
          scope.$watch(function() {
            return scope.$pagination.current
          }, apply)
        } else {
          apply()
        }

        function apply() {
          scope.$pagination.limit = scope.$pagination.current * sizeOfEachRow
          scope.$pagination.skip = sizeOfEachRow * (scope.$pagination.current - 1)
          scope.$pagination.numberOfPages = Math.ceil(ctrl.source.length / sizeOfEachRow)
          scope.$pagination.tabs = scope.$pagination.getTabs()
        }
      }
    }
    return ddo
  }

  function ControlDirective() {
    const ddo = {}
    ddo.transclude = true
    ddo.templateUrl = '/views/components/pagination/control.html'
    ddo.link = function(scope, element, attrs, ctrl, transclude) {}
    return ddo
  }
})()

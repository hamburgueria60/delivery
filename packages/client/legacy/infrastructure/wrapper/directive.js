const makeDirective = Directive => {
  const directive = () => new Directive()
  directive.displayName = Directive.displayName
  return directive
}

export default makeDirective

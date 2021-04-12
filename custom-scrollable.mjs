const template = document.body.appendChild( (() => {

  const template = document.createElement( "TEMPLATE" )

  template.content.append(
    (() => { 
        
          const fixed_container = document.createElement( "FIXED-ELEMENT" )

          fixed_container.appendChild( (() => {

            const slot = document.createElement( "SLOT" )

            slot.setAttribute( "name", "fixed-element" )

            return slot
          })() )

          fixed_container.style = `position: sticky; top: 0; left: 0; bottom: 0; right: 0;`

          return fixed_container
    })(),
    (() => {

      const neg_height = document.createElement( "NEG-HEIGHT" ) 

      neg_height.style.height = "var(--inner-height, 100%)"
      // neg_height.style.display = "block"

      return neg_height
    })(),
    (() => {
      
      const style = document.createElement( "LINK" )

      style.setAttribute( "href", "./default.css" )
      style.setAttribute( "rel", "stylesheet" )

      return style
    })()
  )

  return template
})() )

customElements.define( "fixed-scrollable", class extends HTMLElement {
  constructor(){
    super()

    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild( template.content.cloneNode( true ) )

    this.style = `height: 100%; overflow: auto; --scroll: 0; --inner-height: attr( scrollable-height length, 100% )`

    this.addEventListener( "scroll", () => {
      
      this.style.setProperty( "--scroll", this.scrollTop / ( this.firstElementChild.lastElementChild.offsetHeight - this.clientHeight ))
    
    } )

  }

  static get observedAttributes() { return [ "scrollable-height" ] }

  attributeChangedCallback ( name, oldValue , newValue ) {

    this.style.setProperty( "--inner-height", newValue )
  }

} )
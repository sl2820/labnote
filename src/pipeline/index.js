import Rete from "rete"
import VueRenderPlugin from "rete-vue-render-plugin"
import ConnectionPlugin from "rete-connection-plugin"
import AreaPlugin from "rete-area-plugin"
import ContextMenuPlugin from "rete-context-menu-plugin"
import { ColorComponent } from "@/pipeline/components/ColorComponent"
import { AddComponent } from "@/pipeline/components/AddComponent"
import data from "@/pipeline/data.json"

export default async function(container) {
  var components = [new ColorComponent(), new AddComponent()]

  var editor = new Rete.NodeEditor("demo@0.1.0", container)
  editor.use(ConnectionPlugin)
  editor.use(VueRenderPlugin)
  editor.use(ContextMenuPlugin)
  editor.use(AreaPlugin)

  var engine = new Rete.Engine("demo@0.1.0")

  components.map(c => {
    editor.register(c)
    engine.register(c)
  })

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      await engine.abort()
      await engine.process(editor.toJSON())
    }
  )

  await editor.fromJSON(data)

  editor.view.resize()
  AreaPlugin.zoomAt(editor)

  setTimeout(() => editor.trigger("process"), 1000)
}

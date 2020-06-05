import React from "react"
import ModeSwitch from "./Switch"
import Switchable from "./Switchable"
import ModesProvider from "./Provider"
import { addDecorator } from "@storybook/react"

export default {
  title: "Switchable Modes",
  component: ModeSwitch,
  decorators: [
    (storyFn, ctx) => {
      const idPrefix = `${ctx.id}-preview-mode-`
      return (
        <ModesProvider idPrefix={idPrefix} name={idPrefix}>
          <div>{storyFn({ idPrefix, name })}</div>
        </ModesProvider>
      )
    },
  ],
}

export const usage = ({ idPrefix }) => <ModeSwitch idPrefix={idPrefix} />

export const wide = ({ idPrefix }) => (
  <ModeSwitch idPrefix={idPrefix} sx={{ width: "100%", display: "block" }} />
)

export const feature_showcase = ({ idPrefix }) => (
  <>
    <ModeSwitch idPrefix={idPrefix} />

    <Switchable
      idPrefix={idPrefix}
      gitlab={
        <pre>
          Hello, there!{"\n"}
          This is source that only makes sense on GitLab!
        </pre>
      }
      github={
        <pre>
          On the other hand, this is source that only makes sense on GitHub!
        </pre>
      }
    />

    <div>I'm just some content that reflows depending on the mode!</div>
    <ModeSwitch
      idPrefix={idPrefix}
      left="GL"
      right="GH"
      sx={{ width: "100%", display: "block" }}
    />
  </>
)

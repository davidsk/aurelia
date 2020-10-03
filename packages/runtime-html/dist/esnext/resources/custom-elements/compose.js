var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { nextId, PLATFORM, onResolve, } from '@aurelia/kernel';
import { BindingMode, IDOM, ITargetedInstruction, CustomElementDefinition, bindable, customElement, getRenderContext, } from '@aurelia/runtime';
import { createElement, } from '../../create-element';
function toLookup(acc, item) {
    const to = item.to;
    if (to !== void 0 && to !== 'subject' && to !== 'composing') {
        acc[to] = item;
    }
    return acc;
}
let Compose = /** @class */ (() => {
    let Compose = class Compose {
        constructor(dom, instruction) {
            this.dom = dom;
            this.id = nextId('au$component');
            this.subject = void 0;
            this.composing = false;
            this.view = void 0;
            this.lastSubject = void 0;
            this.properties = instruction.instructions.reduce(toLookup, {});
        }
        afterAttach(initiator, parent, flags) {
            const { subject, view } = this;
            if (view === void 0 || this.lastSubject !== subject) {
                this.lastSubject = subject;
                this.composing = true;
                return this.compose(void 0, subject, initiator, flags);
            }
            return this.compose(view, subject, initiator, flags);
        }
        afterUnbind(initiator, parent, flags) {
            return this.deactivate(this.view, initiator, flags);
        }
        subjectChanged(newValue, previousValue, flags) {
            const { $controller } = this;
            if (!$controller.isActive) {
                return;
            }
            if (this.lastSubject === newValue) {
                return;
            }
            this.lastSubject = newValue;
            this.composing = true;
            flags |= $controller.flags;
            const ret = onResolve(this.deactivate(this.view, null, flags), () => {
                // TODO(fkleuver): handle & test race condition
                return this.compose(void 0, newValue, null, flags);
            });
            if (ret instanceof Promise) {
                ret.catch(err => { throw err; });
            }
        }
        compose(view, subject, initiator, flags) {
            return onResolve(view === void 0
                ? onResolve(subject, resolvedSubject => {
                    return this.resolveView(resolvedSubject, flags);
                })
                : view, resolvedView => {
                return this.activate(resolvedView, initiator, flags);
            });
        }
        deactivate(view, initiator, flags) {
            return view === null || view === void 0 ? void 0 : view.deactivate(initiator !== null && initiator !== void 0 ? initiator : view, this.$controller, flags);
        }
        activate(view, initiator, flags) {
            const { $controller } = this;
            return onResolve(view === null || view === void 0 ? void 0 : view.activate(initiator !== null && initiator !== void 0 ? initiator : view, $controller, flags, $controller.scope, $controller.hostScope), () => {
                this.composing = false;
            });
        }
        resolveView(subject, flags) {
            const view = this.provideViewFor(subject, flags);
            if (view) {
                view.setLocation(this.$controller.projector.host, 1 /* insertBefore */);
                view.lockScope(this.$controller.scope);
                return view;
            }
            return void 0;
        }
        provideViewFor(subject, flags) {
            if (!subject) {
                return void 0;
            }
            if (isController(subject)) { // IController
                return subject;
            }
            if ('createView' in subject) { // RenderPlan
                return subject.createView(this.$controller.context);
            }
            if ('create' in subject) { // IViewFactory
                return subject.create(flags);
            }
            if ('template' in subject) { // Raw Template Definition
                const definition = CustomElementDefinition.getOrCreate(subject);
                return getRenderContext(definition, this.$controller.context).getViewFactory().create(flags);
            }
            // Constructable (Custom Element Constructor)
            return createElement(this.dom, subject, this.properties, this.$controller.projector === void 0
                ? PLATFORM.emptyArray
                : this.$controller.projector.children).createView(this.$controller.context);
        }
        onCancel(initiator, parent, flags) {
            var _a;
            (_a = this.view) === null || _a === void 0 ? void 0 : _a.cancel(initiator, this.$controller, flags);
        }
        dispose() {
            var _a;
            (_a = this.view) === null || _a === void 0 ? void 0 : _a.dispose();
            this.view = (void 0);
        }
        accept(visitor) {
            var _a;
            if (((_a = this.view) === null || _a === void 0 ? void 0 : _a.accept(visitor)) === true) {
                return true;
            }
        }
    };
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], Compose.prototype, "subject", void 0);
    __decorate([
        bindable({ mode: BindingMode.fromView }),
        __metadata("design:type", Boolean)
    ], Compose.prototype, "composing", void 0);
    Compose = __decorate([
        customElement({ name: 'au-compose', template: null, containerless: true }),
        __param(0, IDOM),
        __param(1, ITargetedInstruction),
        __metadata("design:paramtypes", [Object, Object])
    ], Compose);
    return Compose;
})();
export { Compose };
function isController(subject) {
    return 'lockScope' in subject;
}
//# sourceMappingURL=compose.js.map
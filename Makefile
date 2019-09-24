.PHONY: dist test
default: help

install:
	npm install

dev:
	npm run dev

new:
	node build/new.js $(filter-out $@,$(MAKECMDGOALS))

dist: install
	npm run dist

test:
	npm run test

help:
	@echo "   \033[35mmake new <component-name> [中文名]\033[0m\t---  创建新组件 package. 例如 'make new button 按钮'"
	@echo "   \033[35mmake dev\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  开发模式"
	@echo "   \033[35mmake dist\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  编译项目，生成目标文件"

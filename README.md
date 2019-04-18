# Nova Clickable Row

Package that will enable default action on click or double click
on resource table rows in Laravel Nova.

## Installation

From your project's folder run:
```
composer require ryanw3b3r/nova-clickable-row
```

## Customization

By default table rows will respond to single click event and
will redirect to __View__ action.

If you want to change single click to double click or redirect
to __Edit__ action instead of __View__ then you can do so in your
`\App\Providers\NovaServiceProvider` in `boot` method:

```
public function boot()
{
    Nova::serving(function (ServingNova $event) {
        Nova::provideToScript([
            'clickableRow' => [
                'event' => 'dblclick', // click or dblclick
                'action' => 'edit', // view or edit
            ]
        ]);
    });

    parent::boot();
}
```

## License

The MIT License (MIT).

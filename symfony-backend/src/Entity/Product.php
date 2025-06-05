<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['product:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['product:read'])]
    private string $name;

    #[ORM\Column(type: 'float')]
    #[Groups(['product:read'])]
    private float $price;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['product:read'])]
    private string $image;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['product:read'])]
    private bool $disponible = true;

    #[ORM\Column(type: 'string', length: 10, nullable: true)]
    #[Groups(['product:read'])]
    private ?string $talla = null;

    // Getters y Setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;
        return $this;
    }

    public function getImage(): string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;
        return $this;
    }

    public function isDisponible(): bool
    {
        return $this->disponible;
    }

    public function setDisponible(bool $disponible): self
    {
        $this->disponible = $disponible;
        return $this;
    }

    public function getTalla(): ?string
    {
        return $this->talla;
    }

    public function setTalla(?string $talla): self
    {
        $this->talla = $talla;
        return $this;
    }
}
